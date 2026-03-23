'use client';

import { login } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import KakaoLogin from '@/components/auth/KakaoLogin';
import BaseButton from '@/components/common/BaseButton';
import useUserStore from '@/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [userState, formAction, isPending] = useActionState(login, null);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const kakaoError = searchParams.get('error') === 'kakao';

  // 로그인 성공 시 user 정보 세팅, 페이지 이동
  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        name: userState.item.name,
        email: userState.item.email,
        phone: userState.item.phone,
      });
      router.replace('/');
    }
  }, [setUser, userState, router]);

  return (
    <form action={formAction}>
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} error={userState?.ok === 0 ? userState?.errors?.email?.msg : null} />
      <AuthInput
        label="비밀번호"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호를 입력하세요."
        className="mb-0"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={userState?.ok === 0 ? userState?.errors?.password?.msg : null}
        suffix={
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'} className="absolute right-4 top-1/2 -translate-y-1/2 text-yg-gray hover:text-yg-primary md:right-6">
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        }
      />

      <BaseButton type="submit" size="xl" variant={isPending ? 'disabled' : 'primary'} disabled={isPending} className="mt-12 md:mt-15">
        {isPending ? <BeatLoader size={10} color="#fff" /> : '로그인'}
      </BaseButton>
      {userState?.ok === 0 && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.message}</p>}
      {kakaoError && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">카카오 로그인에 실패했습니다. 다시 시도해 주세요.</p>}

      <KakaoLogin />
    </form>
  );
}
