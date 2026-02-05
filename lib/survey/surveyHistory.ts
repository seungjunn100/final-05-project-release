// lib/survey/surveyHistory.ts
import type { SurveyResultPayload } from '@/types/survey';

export interface SurveyHistoryItem {
  id: string;
  title: string;
  date: string;
  payload: SurveyResultPayload;
  supplements: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  }>;
}

// 사용자별 저장소 키 생성
function getSurveyHistoryKey(userId: number): string {
  return `surveyHistory_${userId}`;
}

// 설문 기록 저장
export function saveSurveyHistory(
  userId: number,
  payload: SurveyResultPayload,
  supplements: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  }>
): void {
  const history = getSurveyHistory(userId);
  
  const newRecord: SurveyHistoryItem = {
    id: `survey-${Date.now()}`,
    title: `건강 설문 #${history.length + 1}`,
    date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
    payload,
    supplements,
  };

  history.unshift(newRecord); // 최신순으로 추가
  
  try {
    localStorage.setItem(getSurveyHistoryKey(userId), JSON.stringify(history));
  } catch (error) {
    console.error('설문 기록 저장 실패:', error);
  }
}

// 설문 기록 조회
export function getSurveyHistory(userId: number): SurveyHistoryItem[] {
  try {
    const raw = localStorage.getItem(getSurveyHistoryKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as SurveyHistoryItem[];
  } catch (error) {
    console.error('설문 기록 조회 실패:', error);
    return [];
  }
}

// 특정 설문 기록 조회
export function getSurveyHistoryById(userId: number, id: string): SurveyHistoryItem | null {
  const history = getSurveyHistory(userId);
  return history.find((item) => item.id === id) || null;
}

// 설문 기록 삭제
export function deleteSurveyHistory(userId: number, id: string): void {
  const history = getSurveyHistory(userId);
  const filtered = history.filter((item) => item.id !== id);
  
  try {
    localStorage.setItem(getSurveyHistoryKey(userId), JSON.stringify(filtered));
  } catch (error) {
    console.error('설문 기록 삭제 실패:', error);
  }
}

// 사용자의 모든 설문 기록 삭제 (로그아웃 시 사용)
export function clearSurveyHistory(userId: number): void {
  try {
    localStorage.removeItem(getSurveyHistoryKey(userId));
  } catch (error) {
    console.error('설문 기록 삭제 실패:', error);
  }
}