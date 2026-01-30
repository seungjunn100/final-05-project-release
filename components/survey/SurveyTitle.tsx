// app/survey/components/SurveyTitle.tsx
import type { ReactNode } from 'react';

type SurveyTitleProps = {
  title?: string;
  children: ReactNode;
};

export default function SurveyTitle({ title = '설문 페이지', children }: SurveyTitleProps) {
  return (
    <>
      <div className="pt-6 text-center text-sm font-medium text-[var(--color-yg-gray)] lg:pt-8">{title}</div>
      {children}
    </>
  );
}
