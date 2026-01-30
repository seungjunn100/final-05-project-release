import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

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
        <LoginForm />
      </div>

      <div className="flex justify-center items-center max-w-lg mx-auto mt-14 px-4 md:mt-20">
        <Link href="/signup" className="font-medium text-[14px] text-yg-primary md:text-base">
          회원가입
        </Link>
        <span className="inline-block mx-4 text-[14px] text-yg-primary md:mx-6 md:text-[18px]">|</span>
        <Link href="/signup" className="font-medium text-[14px] text-yg-primary md:text-base">
          비밀번호 찾기
        </Link>
      </div>
    </main>
  );
}
