import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-t-gray-200">
      <div className="flex flex-col gap-4 px-4 pt-2 pb-6 md:flex-row md:flex-wrap md:items-center md:justify-between xl:w-6xl xl:mx-auto xl:px-0">
        <Link href="/">
          <Image width={58} height={58} src="/icons/logo.svg" alt="영구 로고" className="md:w-20 md:h-20" />
        </Link>

        <div className="flex gap-6">
          <span>
            <Link href="/" className="block font-medium text-[14px] md:text-[16px]">
              이용약관
            </Link>
          </span>
          <span>
            <Link href="/" className="block font-medium text-[14px] md:text-[16px]">
              개인정보처리방침
            </Link>
          </span>
          <span>
            <Link href="/" className="block font-medium text-[14px] md:text-[16px]">
              문의하기
            </Link>
          </span>
        </div>

        <div className="w-full">
          <p className="text-[12px] md:text-[14px]">학습 및 포트폴리오 목적으로 제작된 프로젝트입니다.</p>
          <p className="text-[12px] md:text-[14px]">ⓒ 2026. 멋쟁이사자처럼 프론트엔드 부트캠프 15기 우유</p>
        </div>
      </div>
    </footer>
  );
}
