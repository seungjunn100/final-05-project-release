import { Metadata } from 'next';
import SubscriptionClient from './SubscriptionClient';

export const metadata: Metadata = {
  title: '구독하기',
  description: 'AI가 추천하는 맞춤 영양제를 구독하세요. 매달 정기 배송으로 건강을 관리하세요.',
  openGraph: {
    title: '구독하기',
    description: 'AI가 추천하는 맞춤 영양제를 구독하세요.',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Subscription() {
  return <SubscriptionClient />;
}
