import KakaoLoginCallback from '@/components/auth/KakaoLoginCallback';
import { Suspense } from 'react';

export default function LoginKakaoPage() {
  return (
    <Suspense fallback={null}>
      <KakaoLoginCallback />
    </Suspense>
  );
}
