'use client';

import { useRouter } from 'next/navigation';

import SurveyTitle from '@/components/survey/SurveyTitle';
import ProgressBar from '@/components/survey/ProgressBar';

export default function SurveyStartPage() {
  const router = useRouter();

  return (
    <SurveyTitle title="설문 페이지">
      <div className="flex flex-col items-center justify-center gap-8 py-12">
        {/* ProgressBar (0%) */}
        <div className="w-full max-w-xl">
          <ProgressBar value={0} />
        </div>

        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-[var(--color-yg-black)]">AI 맞춤 영양제 추천</h1>

        {/* 알약 아이콘 */}
        <img src="/icons/survey/pill.png" alt="알약 아이콘" width={48} height={48} />

        {/* 설명 문구 */}
        <p className="max-w-sm text-center text-sm leading-6 text-[var(--color-yg-darkgray)]">
          간단한 설문조사를 통해
          <br />
          AI 맞춤 추천을 받고 정기구독을 시작해보세요
        </p>

        {/* 시작하기 버튼 */}
        <button type="button" className="mt-6 w-full max-w-md rounded-full bg-[var(--color-yg-primary)] py-4 text-base font-semibold text-white transition hover:opacity-90" onClick={() => router.push('/survey/question')}>
          시작하기
        </button>
      </div>
    </SurveyTitle>
  );
}
