import { Metadata } from 'next';
import MyPageClient from './MyPageClient';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '내 정보를 관리하고 구독 상태를 확인하세요. 영구 YoungGoo에서 맞춤 영양제 구독을 관리할 수 있습니다.',
  openGraph: {
    title: '마이페이지',
    description: '내 정보를 관리하고 구독 상태를 확인하세요.',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function MyPage() {
  return <MyPageClient />;
}
