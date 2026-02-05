'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

interface UpdateUserInfoData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
}

interface UpdateUserInfoResponse {
  ok: 0 | 1;
  message?: string;
  item?: {
    _id: number;
    name: string;
    email: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
  };
}

// 사용자 정보 수정
export async function updateUserInfo(
  userId: number,
  data: UpdateUserInfoData,
): Promise<UpdateUserInfoResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return { ok: 0, message: '인증이 필요합니다.' };
    }

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'client-id': CLIENT_ID,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return { ok: 0, message: '인증이 만료되었습니다. 다시 로그인해주세요.' };
    }

    const result = await response.json();

    if (!response.ok) {
      return { ok: 0, message: result.message || '사용자 정보 수정에 실패했습니다.' };
    }

    return result;
  } catch (error) {
    console.error('사용자 정보 수정 오류:', error);
    return { ok: 0, message: '사용자 정보 수정 중 오류가 발생했습니다.' };
  }
}