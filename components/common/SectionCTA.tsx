import Link from 'next/link';

export default function SectionCTA() {
  return (
    <section id="go-survey" className="bg-[rgba(232,154,128,0.3)]">
      <div className="px-4 py-16 lg:py-22 xl:w-6xl xl:mx-auto xl:px-0 text-center">
        <h2 className="font-bold text-yg-black text-[22px]/[1.4] text-center md:text-2xl lg:text-3xl">지금 바로 AI에게 추천받아 보세요!</h2>
        <p className="mt-3 mb-9 text-yg-black text-[14px] text-center md:text-[15px] lg:mt-5 lg:mb-6 lg:text-[16px]">
          AI가 추천해주는 영양제를 구독하기 전에 <br />
          신규 회원 첫 가입 시 20% 할인 쿠폰을 증정해 드립니다.
        </p>
        <Link
          href="/survey"
          className="inline-block px-7 py-2.5 font-medium text-[16px] text-white bg-yg-secondary rounded-full transition-all lg:hover:-translate-0.5 lg:hover:shadow-[3px_5px_0_rgba(0,0,0,0.2)] lg:active:translate-0 lg:active:shadow-[0_0_0_rgba(0,0,0,0.25)] lg:px-9 lg:py-3 lg:text-[18px]"
        >
          AI 추천받기
        </Link>
      </div>
    </section>
  );
}
