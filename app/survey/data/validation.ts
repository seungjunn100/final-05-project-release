import type { QuestionData } from '@/app/survey/data/Questions';

//현재 answer을 기준으로 다음 단계로 이동 가능한지 판단하는 유효성 검사 함수
export function validateAnswer(q: QuestionData, answer: unknown): { isValid: boolean; message?: string } {
  switch (q.uiType) {
    //기본 정보
    case 'basicInfo': {
      if (!answer || typeof answer !== 'object') {
        return { isValid: false, message: '기본 정보를 입력해주세요.' };
      }

      // basicInfo는 gender + ageGroup 두 값 필수
      const a = answer as Record<string, unknown>;
      const genderOk = typeof a.gender === 'string' && a.gender.length > 0;
      const ageOk = typeof a.ageGroup === 'string' && a.ageGroup.length > 0;

      return genderOk && ageOk ? { isValid: true } : { isValid: false, message: '성별과 연령대를 모두 선택해주세요.' };
    }

    //카테고리, 다중 선택
    case 'categorySelect':
    case 'multiChoice': {
      // 최소 1개 이상
      if (!Array.isArray(answer) || answer.length === 0) {
        return { isValid: false, message: '최소 1개 이상 선택해주세요.' };
      }
      return { isValid: true };
    }

    //강도 선택
    case 'scaleChoice': {
      if (typeof answer !== 'number' || answer < 1 || answer > 5) {
        return { isValid: false, message: '강도를 선택해주세요.' };
      }
      return { isValid: true };
    }

    //안전 장치
    default: {
      //값이 없으면 실패 처리
      if (answer === undefined || answer === null) {
        return { isValid: false, message: '응답이 필요합니다.' };
      }
      return { isValid: true };
    }
  }
}
