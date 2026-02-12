'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { getProducts } from '@/lib/api/products';
import { postAiRecommend } from '@/lib/api/ai';
import { saveSurveyToServer } from '@/lib/api/survey';

import type { SupplementItem } from '@/types/product';
import type { SurveyResultPayload } from '@/types/survey';
import type { AiRecommendRequest } from '@/types/ai';

import { SURVEY_RESULT_PAYLOAD_KEY } from '@/app/survey/constants/storage';
import useUserStore from '@/store/userStore';

import ResultShell from '@/components/survey/result/ResultShell';
import ConditionSummaryCard from '@/components/survey/result/ConditionSummaryCard';
import SupplementCard, { type Supplement } from '@/components/survey/result/SupplementCard';
import AiQuestion from '@/components/survey/result/AiQuestion';
import SubscribeButton from '@/components/survey/result/SubscribeButton';
import SupplementSkeleton from '@/components/survey/result/SupplementSkeleton';

const MAX_RECOMMEND_COUNT = 3;
const RECOMMENDED_PRODUCTS_KEY = 'recommendedProducts';

// FALLBACK
const FALLBACK_SUMMARY = '설문 결과를 기반으로 카테고리별 추천 영양제를 준비했어요.';

function saveRecommendedProducts(supplements: Supplement[]) {
  const recommendedProducts = supplements.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    imageUrl: item.imageUrl,
  }));

  sessionStorage.setItem(RECOMMENDED_PRODUCTS_KEY, JSON.stringify(recommendedProducts));
}

// SupplementItem → Supplement 변환
function mapToSupplement(item: SupplementItem): Supplement {
  return {
    id: String(item._id),
    name: item.name,
    price: item.price,
    description: (item.mainFunctions ?? []).join(', '),
    tags: (item.mainNutrients ?? []).slice(0, 2).map((n) => ({ label: n })),
    badge: '추천',
    imageUrl: item.imageUrl,
  };
}

// 선택한 카테고리 개수에 따라 추천 개수 결정
function getRecommendCount(selectedCategories: unknown): number {
  const n = Array.isArray(selectedCategories) ? selectedCategories.length : 0;
  if (n <= 0) return 0;
  if (n === 1) return 2;
  return 3;
}

export default function SurveyResultPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [payload, setPayload] = useState<SurveyResultPayload | null | undefined>(undefined);
  const hasSavedHistoryRef = useRef(false);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = sessionStorage.getItem(SURVEY_RESULT_PAYLOAD_KEY);

      if (!raw) {
        setPayload(null);
        return;
      }

      try {
        setPayload(JSON.parse(raw) as SurveyResultPayload);
      } catch {
        setPayload(null);
      }
    });
  }, []);

  // payload 가드: 읽기 완료 후(null)면 리다이렉트
  useEffect(() => {
    if (payload === null) router.replace('/survey');
  }, [payload, router]);

  // 추천 개수
  const recommendCount = payload ? getRecommendCount(payload.selectedCategories) : 0;
  const pickCount = Math.min(recommendCount, MAX_RECOMMEND_COUNT);

  // 상품 API 호출: payload가 있을 때만
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<SupplementItem[]>(
    payload ? 'products' : null,
    async () => {
      const res = await getProducts();
      if (res.ok !== 1 || !res.item) throw new Error('Failed to fetch products');
      return res.item;
    },
    { revalidateOnFocus: false }
  );

  const isError = Boolean(error);

  // 카테고리 상품 후보군 생성
  const candidateProducts: SupplementItem[] = useMemo(() => {
    if (!payload || !products) return [];

    const selected = Array.isArray(payload.selectedCategories) ? payload.selectedCategories : [];
    const selectedSet = new Set(selected.map(String));
    if (pickCount === 0) return [];

    return products.filter((p) => p.categoryId && selectedSet.has(String(p.categoryId)));
  }, [payload, products, pickCount]);

  //AI 실패/미호출 시 유지
  const fallbackSupplements: Supplement[] = useMemo(() => {
    if (!candidateProducts.length) return [];
    const count = Math.min(pickCount, MAX_RECOMMEND_COUNT);
    return candidateProducts.slice(0, count).map(mapToSupplement);
  }, [candidateProducts, pickCount]);

  const { trigger, data: aiData, error: aiError, isMutating: isAiLoading } = useSWRMutation('/api/ai/recommend', postAiRecommend);

  //1회만 호출하여 무한 호출 방지
  const calledRef = useRef(false);

  // payload + products 준비되면 1회만 AI 호출
  useEffect(() => {
    if (calledRef.current) return;
    if (!payload) return;
    if (!products) return;
    if (pickCount === 0) return;
    if (candidateProducts.length === 0) return;

    calledRef.current = true;

    const selected = Array.isArray(payload.selectedCategories) ? payload.selectedCategories : [];
    const req: AiRecommendRequest = {
      payload: {
        selectedCategoryIds: selected.map(String),
      },
      candidates: candidateProducts.map((p) => ({
        id: String(p._id),
        name: p.name,
        categoryId: p.categoryId ? String(p.categoryId) : undefined,
        mainFunctions: p.mainFunctions ?? [],
        mainNutrients: p.mainNutrients ?? [],
      })),
      pickCount,
    };

    trigger(req).catch(() => {});
  }, [payload, products, pickCount, candidateProducts, trigger]);

  // handleRetry 함수
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    if (!payload || !products || candidateProducts.length === 0) return;

    calledRef.current = false;
    setIsRetrying(true);

    const selected = Array.isArray(payload.selectedCategories) ? payload.selectedCategories : [];

    const req: AiRecommendRequest = {
      payload: {
        selectedCategoryIds: selected.map(String),
      },
      candidates: candidateProducts.map((p) => ({
        id: String(p._id),
        name: p.name,
        categoryId: p.categoryId ? String(p.categoryId) : undefined,
        mainFunctions: p.mainFunctions ?? [],
        mainNutrients: p.mainNutrients ?? [],
      })),
      pickCount,
    };

    trigger(req)
      .catch(() => {})
      .finally(() => setIsRetrying(false));
  };

  // 성공 시 top3 순서로 정렬 + reason 반영
  const finalSupplements: Supplement[] = useMemo(() => {
    // AI 실패 시 추천 리스트 표시하지 않음
    if (aiError) return [];

    // AI 성공 시
    if (aiData?.top3?.length && products) {
      const productMap = new Map<string, SupplementItem>();
      for (const p of products) productMap.set(String(p._id), p);

      const reasonMap = new Map<string, string>();
      for (const r of aiData.ranked ?? []) {
        reasonMap.set(String(r.id), r.reason);
      }

      const result: Supplement[] = [];
      for (const id of aiData.top3) {
        const p = productMap.get(String(id));
        if (!p) continue;

        const sup = mapToSupplement(p);
        const reason = reasonMap.get(String(id));

        if (reason) sup.description = reason;

        result.push(sup);
      }

      // top3가 부족하면 fallback으로 보완
      if (result.length > 0) return result;
    }

    // AI 미완료 시 fallback 유지
    return fallbackSupplements;
  }, [aiError, aiData, products, fallbackSupplements]);

  // 질문용 top3 변환
  const top3ForAiQuestion = useMemo(
    () =>
      finalSupplements.slice(0, 3).map((s) => ({
        name: s.name,
        description: s.description,
      })),
    [finalSupplements]
  );

  const summaryText = useMemo(() => {
    if (aiError) return '답변을 생성하는 데 문제가 발생했어요. 잠시 후 다시 시도해주세요.';
    return aiData?.summary ?? FALLBACK_SUMMARY;
  }, [aiError, aiData]);

  // 설문 기록 저장 (finalSupplements가 로드되면 자동 저장)
  useEffect(() => {
    if (!finalSupplements.length || !payload || !user) return;

    // AI 로딩 중이면 대기
    if (isAiLoading) {
      console.log('⏳ AI 응답 대기 중... (로딩)');
      return;
    }

    // AI 데이터가 없고 에러도 없으면 아직 완료 안 됨
    if (!aiData && !aiError) {
      console.log('⏳ AI 응답 대기 중... (데이터 없음)');
      return;
    }

    const currentSurveyId = JSON.stringify(payload);
    const savedSurveyId = localStorage.getItem('lastSavedSurveyId');

    if (!hasSavedHistoryRef.current && savedSurveyId !== currentSurveyId) {
      saveSurveyToServer(payload, finalSupplements, summaryText)
        .then((result) => {
          if (result.ok === 1) {
            localStorage.setItem('lastSavedSurveyId', currentSurveyId);
          }
        })
        .catch(() => {});
      hasSavedHistoryRef.current = true;
    }
  }, [finalSupplements, payload, user, summaryText, aiData, aiError, isAiLoading]);

  const handleSubscribe = () => {
    if (finalSupplements.length === 0) return;
    console.log('🔍 finalSupplements:', finalSupplements);
    saveRecommendedProducts(finalSupplements);
    router.push('/subscription');
  };

  const handleClickDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  // hydration mismatch 방지
  if (payload === undefined) return null;
  if (payload === null) return null; // redirect 중

  return (
    <>
      <ResultShell title="AI 영양제 추천 결과">
        <ConditionSummaryCard summary={summaryText} isLoading={isLoading || isAiLoading} isError={isError} />

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-yg-black">추천 영양제</h2>
            <p className="mt-1 text-sm font-normal text-yg-darkgray">AI가 분석한 맞춤 영양제 {Math.min(recommendCount, MAX_RECOMMEND_COUNT)}가지</p>
          </div>

          {isLoading && <div className="rounded-2xl  bg-yg-white p-6 text-sm text-yg-darkgray shadow-sm">추천 영양제를 불러오는 중이에요...</div>}

          {!isLoading && isError && (
            <div className="rounded-2xl border border-yg-lightgray bg-white p-6 shadow-sm">
              <p className="text-sm text-yg-darkgray">추천 영양제를 불러오지 못했어요.</p>
              <button type="button" onClick={() => mutate()} className="mt-4 rounded-xl border border-yg-lightgray bg-white px-4 py-2 text-sm font-semibold text-yg-black">
                다시 시도
              </button>
            </div>
          )}

          {isAiLoading && <SupplementSkeleton />}

          {!isAiLoading && !aiError && finalSupplements.length > 0 && (
            <div className="space-y-6">
              {finalSupplements.map((item) => (
                <SupplementCard key={item.id} item={item} onClickDetail={handleClickDetail} />
              ))}
            </div>
          )}

          {aiError && (
            <div className="rounded-2xl border border-yg-lightgray bg-white p-6 shadow-sm">
              <p className="text-sm text-yg-darkgray">AI 추천을 생성하는 데 문제가 발생했어요. 잠시 후 다시 시도하거나, 설문을 다시 진행해 주세요.</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={handleRetry} disabled={isRetrying} className={`rounded-xl border border-yg-lightgray bg-white px-4 py-2 text-sm font-semibold text-yg-black transition-colors ${isRetrying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yg-lightgray active:bg-yg-gray'}`}>
                  {isRetrying ? 'AI 다시 요청 중...' : '다시 시도하기'}
                </button>

                <button type="button" onClick={() => router.push('/survey')} className="rounded-2xl border border-yg-lightgray bg-white px-4 py-2 text-sm font-semibold text-yg-black transition-colors hover:bg-yg-lightgray active:bg-yg-gray focus:outline-none">
                  설문 다시 하기
                </button>
              </div>
            </div>
          )}
        </section>

        <AiQuestion payloadSummary={summaryText} top3Products={top3ForAiQuestion} />
      </ResultShell>

      <SubscribeButton onClick={handleSubscribe} />
    </>
  );
}
