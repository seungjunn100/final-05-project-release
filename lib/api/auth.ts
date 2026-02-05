import { EmailCheckRes } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export async function emailCheck(email: string): Promise<EmailCheckRes> {
  try {
    const res = await fetch(`${API_URL}/users/email?email=${encodeURIComponent(email)}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
    });

    const resJson = await res.json();

    return resJson;
  } catch (err) {
    console.error(err);
    return { ok: 0, message: '네트워크 오류로 이메일 중복 확인에 실패했습니다.' };
  }
}
