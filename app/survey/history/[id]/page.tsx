'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSurveyByIdFromServer, type SurveyHistoryItem } from '@/lib/api/survey';

import ResultShell from '@/components/survey/result/ResultShell';
import ConditionSummaryCard from '@/components/survey/result/ConditionSummaryCard';
import SupplementCard, { type Supplement } from '@/components/survey/result/SupplementCard';
import AiQuestion from '@/components/survey/result/AiQuestion';

const TEMP_SUMMARY = '설문 결과를 기반으로 카테고리별 추천 영양제를 준비했어요.';

export default function SurveyHistoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  const targetId = params.id as string;
  
  const [historyData, setHistoryData] = useState<SurveyHistoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!targetId) {
      router.replace('/mypage');
      return;
    }

    const loadSurveyData = async () => {
      setIsLoading(true);
      const result = await getSurveyByIdFromServer(targetId);
      
      if (result.ok === 1 && result.item) {
        setHistoryData(result.item);
      } else {
        router.replace('/mypage');
      }
      setIsLoading(false);
    };

    loadSurveyData();
  }, [targetId, router]);

  const handleClickDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  const handleGoBack = () => {
    router.push('/mypage');
  };

  if (isLoading || !historyData) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yg-primary mb-4"></div>
          <p className="text-lg text-yg-darkgray">설문 기록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const supplements: Supplement[] = historyData.memo.supplements.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description,
    tags: [],
    badge: '추천',
    imageUrl: item.imageUrl,
  }));

  return (
    <>
      <ResultShell title={`${historyData.memo.title} (${historyData.memo.date})`}>
        <div className="mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-yg-primary font-semibold hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            마이페이지로 돌아가기
          </button>
        </div>

        <ConditionSummaryCard summary={TEMP_SUMMARY} />

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-yg-black">추천 영양제</h2>
            <p className="mt-1 text-sm font-normal text-yg-darkgray">
              AI가 분석한 맞춤 영양제 {supplements.length}가지
            </p>
          </div>

          {supplements.length === 0 ? (
            <div className="rounded-2xl border border-yg-lightgray bg-white p-6 text-sm text-yg-darkgray shadow-sm">
              추천 조건을 충족하는 건강식품이 없어요.
            </div>
          ) : (
            <div className="space-y-6">
              {supplements.map((item) => (
                <SupplementCard key={item.id} item={item} onClickDetail={handleClickDetail} />
              ))}
            </div>
          )}
        </section>

        <AiQuestion />
      </ResultShell>
    </>
  );
}