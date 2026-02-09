'use client';

import { useEffect, useState } from 'react';
import { Supplement } from '@/components/survey/result/SupplementCard';

//저장된 top3 추천상품 데이터를 꺼내올 수 있도록
export function useSurveySupplements(): Supplement[] {
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('top3Supplements');
    if (stored) {
      try {
        const parsed: Supplement[] = JSON.parse(stored);
        queueMicrotask(() => setSupplements(parsed));
      } catch {
        console.error('Invalid supplements data in sessionStorage');
        queueMicrotask(() => setSupplements([]));
      }
    }
  }, []);

  return supplements;
}
