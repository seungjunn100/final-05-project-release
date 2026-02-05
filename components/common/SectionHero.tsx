import Image from 'next/image';
import Link from 'next/link';

export default function SectionHero() {
  return (
    <section id="visual" className="bg-[radial-gradient(50%_49.01%_at_50%_50.99%,rgba(232,154,128,0.20)_0.02%,rgba(74,197,178,0.24)_99.01%)]">
      <div className="px-4 pt-10 pb-16 md:flex md:items-center md:justify-between md:pb-10 xl:w-6xl xl:mx-auto xl:px-0">
        <Image width={500} height={380} src="/images/nutritional_supplements.png" alt="영양제" className="w-70 mx-auto md:w-100 md:order-1 md:mx-0 lg:w-125" />
        <div className="mt-4 text-center md:mt-0 md:pt-6 md:text-left">
          <h1 className="font-bold text-yg-black text-[26px]/[1.4] md:text-3xl/[1.4] lg:text-4xl/[1.4]">
            당신과 쭉 함께하는 <br />
            맞춤 영양제 구독
          </h1>
          <p className="mt-3 text-yg-black text-[14px] md:text-[15px] lg:text-[16px]">
            AI 검사로 나만의 컨디션에 맞는 영양제를 추천받고, <br />
            매달 맞춤형 영양 케어를 경험해보아요!
          </p>
          <Link
            href="/survey"
            className="inline-block mt-5 px-7 py-2.5 font-medium text-[16px] text-white bg-yg-primary rounded-full transition-all lg:hover:-translate-0.5 lg:hover:shadow-[3px_5px_0_rgba(0,0,0,0.2)] lg:active:translate-0 lg:active:shadow-[0_0_0_rgba(0,0,0,0.25)] lg:px-9 lg:py-3 lg:text-[18px]"
          >
            AI 추천받기
          </Link>
        </div>
      </div>
    </section>
  );
}
