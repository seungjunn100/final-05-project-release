import SignupForm from '@/components/auth/SignupForm';
import Image from 'next/image';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="my-16 md:my-25">
      <header className="flex flex-col items-center">
        <Link href="/">
          <Image width={64} height={64} src="/icons/logo.svg" alt="영구 로고" className="block mx-auto md:w-25 md:h-25" />
        </Link>
        <h1 className="font-bold text-3xl text-center md:text-4xl">회원가입</h1>
      </header>

      <div className="max-w-lg mx-auto mt-14 px-4 md:mt-20">
        <SignupForm />
      </div>
    </main>
  );
}
