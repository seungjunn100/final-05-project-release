'use client';

import { useEffect, useState } from 'react';
import { SurveyResultPayload } from '@/types/survey';

//설문 결과를 가져와서 쓸 수 있게 하는 훅
export function useSurveyPayload(): SurveyResultPayload | null {
  const [payload, setPayload] = useState<SurveyResultPayload | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('surveyPayload');
    if (stored) {
      try {
        const parsed: SurveyResultPayload = JSON.parse(stored);
        // 비동기로 상태 설정
        queueMicrotask(() => setPayload(parsed)); //effect 내에서 setState하면 경고 가능성 있음
      } catch {
        console.error('Invalid survey payload in sessionStorage');
        queueMicrotask(() => setPayload(null));
      }
    }
  }, []);

  return payload;
}
