import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인하여 나만의 맞춤 영양제 추천을 받아보세요.',
  openGraph: {
    title: '로그인',
    description: '로그인하여 나만의 맞춤 영양제 추천을 받아보세요.',
    images: [{ url: '/og/global.png' }],
    url: 'https://final-05-project.vercel.app/login',
  },
};

export default function LoginPage() {
  return (
    <main className="my-16 md:my-25">
      <header className="flex flex-col items-center">
        <Link href="/">
          <Image width={64} height={64} src="/icons/logo.svg" alt="영구 로고" className="block mx-auto md:w-25 md:h-25" />
        </Link>
        <h1 className="font-bold text-3xl text-center md:text-4xl">로그인</h1>
      </header>

      <div className="max-w-lg mx-auto mt-14 px-4 md:mt-20">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

      <div className="flex justify-center items-center max-w-lg mx-auto mt-14 px-4 md:mt-20">
        <Link href="/signup" className="font-medium text-[14px] text-yg-primary md:text-base">
          회원가입
        </Link>
        <span className="inline-block mx-4 text-[14px] text-yg-gray md:mx-6 md:text-[18px]">|</span>
        <span className="font-medium text-[14px] text-yg-gray cursor-not-allowed md:text-base" title="서비스 준비 중입니다.">
          비밀번호 찾기
        </span>
      </div>
    </main>
  );
}
