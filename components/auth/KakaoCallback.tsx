'use client';

import { loginKakao } from '@/actions/auth';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function KakaoCallback() {
  const setUser = useUserStore((state) => state.setUser);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  useEffect(() => {
    async function login() {
      if (code) {
        const response = await loginKakao(code);

        if (response?.ok) {
          setUser({
            _id: response.item._id,
            name: response.item.name,
          });
          alert(`안녕하세요, ${response.item.name}님!\n로그인이 완료되었습니다!`);
          router.replace('/');
        }
      }
    }
    login();
  }, [code, setUser, router]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center w-xs h-50 px-4 bg-[#FFEB00] rounded-2xl">
          <Image width={40} height={40} src="/images/kakao_symbol.png" alt="카카오 로고" className="mb-4" />
          <p className="text-[#3C1E1E] font-medium text-[18px] mb-3">카카오 로그인 중</p>
          <BeatLoader size={12} color="#3C1E1E" />
        </div>
      </div>
    </>
  );
}
