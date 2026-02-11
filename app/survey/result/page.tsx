import type { Metadata } from 'next';
import SurveyResultClient from './SurveyResultClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://final-05-project.vercel.app'),
  title: 'AI 설문 결과',
  description: 'AI 설문 결과를 확인해보세요.',
  openGraph: {
    title: 'AI 설문 결과',
    description: '당신에게 맞는 AI 분석 결과를 확인하세요.',
    url: 'https://final-05-project.vercel.app/survey/result',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
        alt: '설문 결과 썸네일',
      },
    ],
  },
};

export default function Page() {
  return <SurveyResultClient />;
}
