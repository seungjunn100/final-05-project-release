'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateAnswer } from '@/app/survey/data/validation';

import SurveyTitle from '@/components/survey/SurveyTitle';
import ProgressBar from '@/components/survey/ProgressBar';
import Question from '@/components/survey/Question';
import QuestionRenderer from '@/components/survey/QuestionRenderer';
import BottomNav from '@/components/survey/Nav';

import PillIcon from '@/components/survey/icons/pill';

import type { QuestionData } from '@/app/survey/data/Questions';
import type { CategoryKey } from '@/app/survey/data/buildQuestion';
import { buildQuestions } from '@/app/survey/data/buildQuestion';

import { SURVEY_RESULT_PAYLOAD_KEY } from '@/app/survey/constants/storage';
import { buildSurveyPayload } from '@/app/survey/utils/buildSurveyPayload';

type AnswerMap = Record<string, unknown>;

//카테고리 예상 전체 문항 수 8개
const ESTIMATED_TOTAL_BEFORE_CATEGORY = 8;

export default function SurveyQuestionsPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const selectedCategories = answers['category'] as CategoryKey[] | undefined;

  //동적 질문 리스트 생성
  const questions: QuestionData[] = useMemo(() => {
    return buildQuestions(selectedCategories);
  }, [selectedCategories]);

  const total = questions.length;

  // 카테고리 설문에 따른 step 변화에 대한 안전장치
  const safeStep = Math.min(step, Math.max(total - 1, 0));
  const q = questions[safeStep];

  //카테고리 선택 전(예상 질문 8개) -> 후(실제 질문 수)
  const progressTotal = selectedCategories && selectedCategories.length > 0 ? total : ESTIMATED_TOTAL_BEFORE_CATEGORY;

  // step 기준으로 progress바 증감
  const progress = progressTotal <= 1 ? 0 : Math.round(((safeStep + 1) / progressTotal) * 100);

  if (!q) {
    return (
      <SurveyTitle title="설문 페이지">
        <div className="py-16 text-center text-sm text-[var(--color-yg-darkgray)]">질문을 불러오지 못했어요. 다시 시도해주세요.</div>
      </SurveyTitle>
    );
  }

  const answer = answers[q.id];
  const { isValid: isCurrentValid } = validateAnswer(q, answer);

  const handleChange = (next: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: next,
    }));
  };

  const goPrev = () => setStep(Math.max(0, safeStep - 1));
  const goNext = () => setStep(Math.min(total - 1, safeStep + 1));

  const isLast = safeStep === total - 1;

  const handlePrimary = () => {
    if (isLast) {
      const payload = buildSurveyPayload({
        answers,
        selectedCategories: selectedCategories ?? [],
      });

      sessionStorage.setItem(SURVEY_RESULT_PAYLOAD_KEY, JSON.stringify(payload));

      router.push('/survey/result');
      return;
    }

    goNext();
  };

  const badge = q.uiType === 'basicInfo' ? '설문 시작' : q.uiType === 'categorySelect' ? '카테고리 선택' : q.uiType === 'multiChoice' ? '선택 질문' : '강도 질문';

  return (
    <SurveyTitle title="설문 페이지">
      <div className="flex flex-col gap-4">
        <ProgressBar value={progress} />

        <Question badge={badge} title={q.title ?? '질문'} description={q.description} icon={<PillIcon className="h-12 w-12" />} />

        <QuestionRenderer question={q} value={answer} onChange={handleChange} />
        <BottomNav secondaryLabel={safeStep === 0 ? undefined : '이전'} onSecondary={goPrev} primaryLabel={isLast ? '제출' : '다음'} onPrimary={handlePrimary} disabledPrimary={!isCurrentValid} />
      </div>
    </SurveyTitle>
  );
}
