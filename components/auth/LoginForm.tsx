'use client';

import { login } from '@/actions/auth';
import AuthInput from '@/components/auth/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((state) => state.setUser);
  const [userState, formAction, isPending] = useActionState(login, null);
  const router = useRouter();

  const loginWithKakao = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      console.log('인가 코드가 없습니다. 다시 시도해주세요.');
      return;
    }

    const kakaoLogin = async () => {
      try {
        const res = await fetch(`${API_URL}/users/login/kakao`, {
          method: 'POST',
          headers: {
            'Client-Id': CLIENT_ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
          }),
        });

        if (!res.ok) {
          throw new Error('카카오 로그인에 실패했습니다.');
        }

        const resData = await res.json();

        // 토큰 저장
        if (resData.item?.token?.accessToken) {
          sessionStorage.setItem('accessToken', resData.item.token.accessToken);
          sessionStorage.setItem('refreshToken', resData.item.token.refreshToken);
        }

        // 유저 정보 저장
        if (resData.item) {
          setUser({
            _id: resData.item._id,
            email: resData.item.email,
            name: resData.item.name,
            phone: resData.item.phone,
            age: resData.item.age,
            gender: resData.item.gender,
            height: resData.item.height,
            weight: resData.item.weight,
            address: resData.item.address,
            addressDetail: resData.item.addressDetail,
          });
          alert(`안녕하세요, ${resData.item.name}님!\n카카오 로그인이 완료되었습니다!`);
          router.replace('/');
        }
      } catch (err) {
        console.error(err);
        alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
      }
    };

    kakaoLogin();
  }, [setUser, router]);

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

  return (
    <form action={formAction}>
      <AuthInput label="이메일" name="email" type="email" placeholder="이메일을 입력하세요." value={email} onChange={(e) => setEmail(e.target.value)} error={userState?.ok === 0 ? userState?.errors?.email?.msg : null} />
      <AuthInput label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." className="mb-0" value={password} onChange={(e) => setPassword(e.target.value)} error={userState?.ok === 0 ? userState?.errors?.password?.msg : null} />
      <BaseButton type="submit" size="xl" variant={isPending ? 'disabled' : 'primary'} disabled={isPending} className="mt-12 md:mt-15">
        {isPending ? <BeatLoader size={10} color="#fff" /> : '로그인'}
      </BaseButton>
      {userState?.ok === 0 && <p className="mt-2 pl-5 text-[12px] text-yg-warning md:mt-3 md:pl-6.5 md:text-[14px]">{userState?.message}</p>}
      {/* <button className="flex justify-center items-center gap-2 w-full h-11.5 mt-6 font-medium text-[16px] shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-full cursor-pointer md:h-13 md:text-[18px] text-[#3C1E1E] bg-[#FFEB00]" onClick={loginWithKakao}>
        <Image width={25} height={25} src="/images/kakao_symbol.png" alt="카카오 로고" />
        카카오 로그인
      </button> */}
    </form>
  );
}
