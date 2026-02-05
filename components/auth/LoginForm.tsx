'use client';

import { login } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

// 이메일, 비밀번호 정규 표현식
const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordExp = /^.{4,}$/;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
  const [pwdIsValid, setPwdIsValid] = useState<boolean | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const [userState, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  // 로그인 성공 시 user 정보 세팅, 페이지 이동
  useEffect(() => {
    if (userState?.ok) {
      setUser({
        _id: userState.item._id,
        email: userState.item.email,
        name: userState.item.name,
        phone: userState.item.phone,
        age: userState.item.age,
        gender: userState.item.gender,
        height: userState.item.height,
        weight: userState.item.weight,
        address: userState.item.address,
        addressDetail: userState.item.addressDetail,
      });
      alert(`안녕하세요, ${userState.item.name}님!\n로그인이 완료되었습니다!`);
      router.replace('/');
    }
  }, [setUser, userState, router]);

  // 이메일, 비밀번호 input 포커스 아웃 시 동작 함수
  const handleExpBlur = (exp: RegExp, type: string, setIsValid: (value: boolean | null) => void) => {
    if (type.trim() === '') {
      setIsValid(null);
      return;
    }
    setIsValid(exp.test(type));
  };

  return (
    <form action={formAction}>
      <AuthInput
        label="이메일"
        name="email"
        type="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleExpBlur(emailExp, email, setEmailIsValid)}
        isValid={emailIsValid}
        message={emailIsValid ? '올바른 이메일 형식입니다.' : '올바른 이메일 형식이 아닙니다.@!@!@'}
        error={userState?.ok === 0 ? userState?.errors?.email?.msg : null}
      />
      <AuthInput
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력하세요."
        className="mb-0"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleExpBlur(passwordExp, password, setPwdIsValid)}
        isValid={pwdIsValid}
        message={pwdIsValid ? '올바른 비밀번호 형식입니다.' : '비밀번호는 4글자 이상 입력해야 합니다.'}
        error={userState?.ok === 0 ? userState?.errors?.password?.msg : null}
      />
      <BaseButton type="submit" size="xl" variant={isPending ? 'disabled' : 'primary'} disabled={isPending} className="mt-12 md:mt-15">
        {isPending ? <BeatLoader size={10} color="#fff" /> : '로그인'}
      </BaseButton>
      <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.ok === 0 && userState?.message}</p>
    </form>
  );
}
