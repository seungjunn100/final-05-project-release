import { Metadata } from 'next';
import SubscriptionCompleteClient from './SubscriptionCompleteClient';

export const metadata: Metadata = {
  title: '결제 완료',
  description: '결제가 완료되었습니다. 주문하신 영양제를 곧 배송해드리겠습니다.',
  openGraph: {
    title: '결제 완료',
    description: '결제가 완료되었습니다. 감사합니다!',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SubscriptionComplete() {
  return <SubscriptionCompleteClient />;
}