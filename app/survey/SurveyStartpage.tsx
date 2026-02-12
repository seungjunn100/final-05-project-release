'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import SurveyTitle from '@/components/survey/SurveyTitle';
import ProgressBar from '@/components/survey/ProgressBar';
import { getSurveyAttemptCount, increaseSurveyAttemptCount } from '@/lib/surveyAttempt';
import useUserStore from '@/store/userStore';

export default function SurveyStartPage() {
  const router = useRouter();

  const { user, hydrated } = useUserStore();
  const isLoggedIn = Boolean(user);
  const [needLogin, setNeedLogin] = useState(false);

  // "시작하기" 버튼 클릭 시 호출
  const handleStart = () => {
    if (!hydrated) return;

    const attemptCount = getSurveyAttemptCount();

    // 조건: 비로그인 상태 + 설문 1회 이상 참여 시 로그인 유도
    const needsLogin = !isLoggedIn && attemptCount >= 1;

    if (needsLogin) {
      setNeedLogin(true);
      return;
    }

    // 설문 가능 조건 충족 시 시도 횟수 증가 + 질문 페이지로 이동
    increaseSurveyAttemptCount();
    router.push('/survey/question');
  };

  // 로그인 페이지로 이동
  const handleGoLogin = () => {
    router.push('/login?next=/survey/question');
  };
  return (
    <SurveyTitle title="설문 페이지">
      <div className="flex flex-col items-center justify-center gap-8 py-12">
        {/* ProgressBar (0%) */}
        <div className="w-full max-w-xl">
          <ProgressBar value={0} />
        </div>

        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-yg-black">AI 맞춤 영양제 추천</h1>

        {/* 알약 아이콘 */}
        <Image src="/icons/survey/pill.png" alt="알약 아이콘" width={48} height={48} />

        {/* 설명 문구 */}
        <p className="max-w-sm text-center text-sm leading-6 text-yg-darkgray">
          간단한 설문조사를 통해
          <br />
          AI 맞춤 추천을 받고 정기구독을 시작해보세요
        </p>

        {/* 시작하기 버튼 */}
        <button type="button" disabled={!hydrated} onClick={handleStart} className="mt-6 w-full max-w-md rounded-full bg-yg-primary py-4 text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
          시작하기
        </button>

        {/* 로그인 유도 메시지 및 버튼 */}
        {needLogin && (
          <div className="mt-4 w-full max-w-md rounded-xl   bg-yg-white px-4 py-4 text-center text-sm">
            <p className="mb-3 font-medium text-yg-primary">AI 추천받기 2회부터는 로그인이 필요해요</p>
            <button type="button" onClick={handleGoLogin} className="rounded-full bg-yg-primary px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              로그인하러 가기
            </button>
          </div>
        )}
      </div>
    </SurveyTitle>
  );
}
