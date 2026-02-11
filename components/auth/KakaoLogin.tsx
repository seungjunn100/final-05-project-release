import Image from 'next/image';
import Script from 'next/script';

export default function KakaoLogin() {
  function loginWithKakao() {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!, // 앱에 등록된 카카오 로그인에서 사용할 Redirect URI 설정
    });
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!); // 앱에 등록된 카카오 로그인에서 사용할 JavaScript 키 설정
          }
        }}
      />

      <button type="button" onClick={loginWithKakao} className="flex justify-center items-center gap-2 w-full h-11.5 mt-6 font-medium text-[16px] shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full cursor-pointer md:h-13 md:text-[18px] text-[#3C1E1E] bg-[#FFEB00]">
        <Image width={25} height={25} src="/images/kakao_symbol.png" alt="카카오 로고" />
        카카오 로그인
      </button>
    </>
  );
}
