'use client';

import { useMemo } from 'react';
import { SurveyResultPayload } from '@/types/survey';
import { Supplement } from '@/components/survey/result/SupplementCard';

export type PayloadAndTop3 = {
  payloadSummary: string;
  top3Products: {
    name: string;
    description?: string;
  }[];
};

// 설문 결과 추천을 받아서 gpt보낼 형태로 가공
export function useSurveyPayloadAndTop3(payload: SurveyResultPayload | null | undefined, supplements: Supplement[]): PayloadAndTop3 | null {
  return useMemo(() => {
    if (!payload || supplements.length === 0) return null;

    return {
      payloadSummary: payload.summary ?? '사용자의 설문 요약이 제공되지 않았습니다.',
      top3Products: supplements.map((item) => ({
        name: item.name,
        description: item.description,
      })),
    };
  }, [payload, supplements]);
}
