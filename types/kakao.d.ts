// 전역 스코프에 타입을 확장
declare global {
  // 기존 Window 인터페이스에 Kakao 속성 추가
  interface Window {
    // 실제로 쓰는 함수들만 최소한으로 타입 정의
    Kakao: {
      init: (apiKey: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
      };
    };
  }
}

export {};
