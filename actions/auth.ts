'use server';

import { LoginActionState } from '@/types/auth';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// 로그인
export async function login(state: LoginActionState, formdata: FormData): Promise<LoginActionState> {
  const body = Object.fromEntries(formdata.entries());

  let response: Response;
  let data: LoginActionState;

  try {
    response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Id': CLIENT_ID,
      },
      body: JSON.stringify(body),
    });

    data = await response.json();

    if (data?.ok) {
      const accessToken = data.item.token.accessToken;
      const refreshToken = data.item.token.refreshToken;

      const cookieStore = await cookies();

      cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 15, // 15분
      });

      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 14, // 14일
      });
    }
  } catch (err) {
    console.log(err);
    return { ok: 0, message: '일시적인 네트워크 문제가 발생했습니다.' };
  }

  return data;
}

// 로그아웃
export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', '', {
    path: '/',
    maxAge: 0,
  });

  cookieStore.set('refreshToken', '', {
    path: '/',
    maxAge: 0,
  });
}
