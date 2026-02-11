import KakaoCallback from '@/components/auth/KakaoCallback';
import { Suspense } from 'react';

export default function LoginKakaoPage() {
  return (
    <Suspense fallback={<div>로그인 처리중</div>}>
      <KakaoCallback />
    </Suspense>
  );
}
