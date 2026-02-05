'use client';

import dynamic from 'next/dynamic';

const SurveyResultClient = dynamic(() => import('./SurveyResultClient'), {
  ssr: false,
});

export default function Page() {
  return <SurveyResultClient />;
}
