import type { Metadata } from 'next';
import SurveyStartPage from './SurveyStartpage';

export const metadata: Metadata = {
  metadataBase: new URL('https://final-05-project.vercel.app'),
  title: 'AI 설문 시작하기',
  description: '간단한 설문조사를 통해 AI 맞춤 영양제 추천을 받아보세요.',
  openGraph: {
    title: 'AI 설문 시작하기',
    description: '지금 설문을 시작하고 AI의 맞춤 추천을 받아보세요.',
    url: 'https://final-05-project.vercel.app/survey',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
        alt: 'AI 설문 썸네일',
      },
    ],
  },
};

export default function Page() {
  return <SurveyStartPage />;
}
