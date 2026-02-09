'use client';

import { useMemo } from 'react';

export type AiQuestion = {
  id: 'summary' | 'howTo' | 'caution';
  icon: string;
  text: string;
};

//설문 요약과 추천 제품이 있을 때 가이드 질문 3개 구성해서 리턴하는 훅
export function useSurveyAiQuestions(
  payloadSummary: string | null,
  top3Products: { name: string; description?: string }[]
): {
  questions: AiQuestion[];
  loading: boolean;
  error: null;
} {
  const questions = useMemo(() => {
    if (!payloadSummary) return [];
    if (!top3Products || top3Products.length === 0) return [];

    const base: AiQuestion[] = [
      {
        id: 'summary',
        icon: '📝',
        text: '추천된 영양제가 내 상태에 어떤 도움을 줄 수 있을까?',
      },
      {
        id: 'howTo',
        icon: '💊',
        text: '이 영양제들은 어떻게 먹으면 좋을까?',
      },
      {
        id: 'caution',
        icon: '⚠️',
        text: '섭취할 때 주의할 점이 있을까?',
      },
    ];

    return base;
  }, [payloadSummary, top3Products]);

  return {
    questions,
    loading: false,
    error: null,
  };
}
