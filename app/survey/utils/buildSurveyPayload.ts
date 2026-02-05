import type { CategoryKey } from '@/app/survey/data/buildQuestion';
import { Intensity, SurveyResultPayload } from '@/types/survey';

// scaleChoice 숫자 값을 의미값으로 매핑
const INTENSITY_MAP: Record<number, Intensity> = {
  1: 'very_low',
  2: 'low',
  3: 'medium',
  4: 'high',
  5: 'very_high',
};

function mapIntensity(value: unknown): Intensity {
  const n = Number(value);
  return INTENSITY_MAP[n] ?? 'medium';
}

// 설문 answers를 결과 페이지용 payload로 변환

export function buildSurveyPayload(params: { answers: Record<string, unknown>; selectedCategories: CategoryKey[] }): SurveyResultPayload {
  const { answers, selectedCategories } = params;

  const basic = (answers['basic'] as { gender?: string; ageGroup?: string }) ?? {};

  const categories = {} as SurveyResultPayload['categories'];

  selectedCategories.forEach((key) => {
    categories[key] = {
      state: (answers[`${key}_state`] as string[]) ?? [],
      intensity: mapIntensity(answers[`${key}_intensity`]),
    };
  });

  return {
    createdAt: new Date().toISOString(),
    basicInfo: {
      gender: String(basic.gender ?? ''),
      ageGroup: String(basic.ageGroup ?? ''),
    },
    selectedCategories,
    categories,
  };
}
