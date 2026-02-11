import SectionHero from '@/components/common/SectionHero';
import SectionFeatures from '@/components/common/SectionFeatures';
import SectionCTA from '@/components/common/SectionCTA';
import SectionDirections from '@/components/common/SectionDirections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '영구(영양제 구독) - 당신과 쭉 함께하는 맞춤 영양제 구독',
  description: 'AI 검사로 나만의 컨디션에 맞는 영양제를 추천받고, 매달 맞춤형 영양 케어를 경험해보세요. 3분 설문으로 개인 맞춤 영양제 구독 서비스를 시작하세요.',
  keywords: '영양제, 영양제 구독, AI 영양제 추천, 맞춤 영양제, 건강 관리, 영양 관리, 정기 배송, 개인 맞춤, 건강 검사',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '영구(영양제 구독) - 당신과 쭉 함께하는 맞춤 영양제 구독',
    description: 'AI 검사로 나만의 컨디션에 맞는 영양제를 추천받고, 매달 맞춤형 영양 케어를 경험해보세요. 3분 설문으로 개인 맞춤 영양제 구독 서비스를 시작하세요.',
    images: [{ url: '/og/global.png' }],
    url: 'https://final-05-project.vercel.app/',
    type: 'website',
    siteName: '영구(영양제 구독)',
  },
};

export default function Home() {
  return (
    <main>
      <SectionHero />
      <SectionFeatures />
      <SectionDirections />
      <SectionCTA />
    </main>
  );
}
