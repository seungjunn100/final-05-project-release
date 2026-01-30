'use client';

import { login } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import useUserStore from '@/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

export default function LoginForm() {
  const setUser = useUserStore((state) => state.setUser);
  const [userState, formAction, isPending] = useActionState(login, null);
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

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
      router.replace(redirect || '/');
    }
  }, [setUser, userState, router, redirect]);

  return (
    <form action={formAction}>
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." error={userState?.ok === 0 ? userState?.errors?.email?.msg : null} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." className="mb-0" error={userState?.ok === 0 ? userState?.errors?.password?.msg : null} />
      <BaseButton type="submit" size="xl" variant={isPending ? 'disabled' : 'primary'} disabled={isPending} className="mt-12 md:mt-15">
        {isPending ? <BeatLoader size={10} color="#fff" /> : '로그인'}
      </BaseButton>
      <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.ok === 0 && userState?.message}</p>
    </form>
  );
}
