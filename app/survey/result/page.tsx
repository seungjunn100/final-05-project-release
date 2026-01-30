'use client';

import ResultShell from '@/components/survey/result/ResultShell';
import ConditionSummaryCard from '@/components/survey/result/ConditionSummaryCard';
import SupplementCard, { type Supplement } from '@/components/survey/result/SupplementCard';
import AiQuestion from '@/components/survey/result/AiQuestion';
import SubscribeButton from '@/components/survey/result/SubscribeButton';
import { useRouter } from 'next/navigation';

//더미 데이터
const MOCK_SUMMARY = '최근 스트레스와 피로가 누적되어 있으며, 에너지 레벨이 낮은 상태입니다. 면역력 강화와 항산화 성분 보충이 필요해 보입니다.';

const MOCK_SUPPLEMENTS: Supplement[] = [
  {
    id: 'multi',
    name: '멀티비타민 프리미엄',
    description: '전반적인 영양소 균형이 필요한 상태로 판단되어, 비타민 B군과 C, D가 풍부한 종합 비타민을 추천드립니다. 하루 에너지 레벨을 높이는 데 도움이 됩니다.',
    tags: [{ label: '에너지 증진' }, { label: '면역력' }],
    badge: 'AI 추천',
  },
  {
    id: 'omega3',
    name: '오메가-3 피쉬오일',
    description: '스트레스로 인한 염증 반응을 줄이는 데 오메가-3가 효과적입니다. 두뇌 건강과 심혈관 건강을 동시에 관리할 수 있습니다.',
    tags: [{ label: '스트레스 완화' }, { label: '항산화' }],
    badge: 'AI 추천',
  },
  {
    id: 'magnesium',
    name: '마그네슘 플러스',
    description: '수면의 질 개선과 근육 이완에 도움을 주는 마그네슘이 부족한 것으로 보입니다. 스트레스 완화와 숙면에 효과적입니다.',
    tags: [{ label: '스트레스' }, { label: '피로 회복' }],
    badge: 'AI 추천',
  },
];

export default function SurveyResultPage() {
  const router = useRouter();
  const isLoading = false;
  const isError = false;

  const summary = MOCK_SUMMARY;
  const supplements = MOCK_SUPPLEMENTS;

  return (
    <>
      {/* 상단 */}
      <ResultShell title="AI 영양제 추천 결과">
        {/* 설문 요약 */}
        <ConditionSummaryCard summary={summary} isLoading={isLoading} isError={isError} />
        {/* 추천 영양제 리스트 */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-[var(--color-yg-black)]">추천 영양제</h2>
            <p className="mt-1 text-sm font-normal text-[var(--color-yg-darkgray)]">AI가 분석한 맞춤 영양제 3가지</p>
          </div>

          {supplements.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-yg-lightgray)] bg-white p-6 text-sm text-[var(--color-yg-darkgray)] shadow-sm">추천 조건을 충족하는 건강식품이 없어요.</div>
          ) : (
            <div className="space-y-6">
              {supplements.slice(0, 3).map((item) => (
                <SupplementCard key={item.id} item={item} onClickDetail={(id) => router.push(`/products/${id}`)} />
              ))}
            </div>
          )}
        </section>
        {/* AI질문 */}
        <AiQuestion />
      </ResultShell>
      {/* 구독하기 */}
      <SubscribeButton onClick={() => router.push('/subscription')} />
    </>
  );
}
