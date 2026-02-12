'use client';

import { login } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import KakaoLogin from '@/components/auth/KakaoLogin';
import BaseButton from '@/components/common/BaseButton';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function LoginForm() {
  const [email, setEmail] = useState('wx010622@naver.com');
  const [password, setPassword] = useState('1111');

  const [userState, formAction, isPending] = useActionState(login, null);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  // 로그인 성공 시 user 정보 세팅, 페이지 이동
  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        name: userState.item.name,
        email: userState.item.email,
        phone: userState.item.phone,
      });
      alert(`안녕하세요, ${userState.item.name}님!\n로그인이 완료되었습니다!`);
      router.replace('/');
    }
  }, [setUser, userState, router]);

  return (
    <form action={formAction}>
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} error={userState?.ok === 0 ? userState?.errors?.email?.msg : null} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." className="mb-0" value={password} onChange={(e) => setPassword(e.target.value)} error={userState?.ok === 0 ? userState?.errors?.password?.msg : null} />

      <BaseButton type="submit" size="xl" variant={isPending ? 'disabled' : 'primary'} disabled={isPending} className="mt-12 md:mt-15">
        {isPending ? <BeatLoader size={10} color="#fff" /> : '로그인'}
      </BaseButton>
      {userState?.ok === 0 && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.message}</p>}

      <KakaoLogin />
    </form>
  );
}
