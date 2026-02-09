const KEY = 'surveyAttemptCount';

//설문 시도 횟수 가져오기
export function getSurveyAttemptCount(): number {
  if (typeof window === 'undefined') return 0;
  return Number(localStorage.getItem(KEY) ?? 0);
}

//설문 카운트 증가
export function increaseSurveyAttemptCount() {
  if (typeof window === 'undefined') return;
  const current = getSurveyAttemptCount();
  localStorage.setItem(KEY, String(current + 1));
}
