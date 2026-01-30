// app/survey/components/QuestionHeader.tsx
import type { ReactNode } from 'react';

type Props = {
  badge?: string; // ex. "설문 시작", "강도 질문" (질문 상단)
  title: string; // 질문 타이틀
  description?: string; // 질문 설명
  icon?: ReactNode; //Pill
};

export default function QuestionHeader({ badge, title, description, icon }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* 배지 */}
      {badge && <div className="mb-4 rounded-full border border-[var(--color-yg-lightgray)] px-3 py-1 text-xs font-medium text-[var(--color-yg-darkgray)]">{badge}</div>}

      {/* Pill 아이콘 */}
      {icon && <div className="mb-6 flex h-12 w-12 items-center justify-center">{icon}</div>}

      {/* 타이틀 */}
      <h2 className="title-02 text-[var(--color-yg-black)]">{title}</h2>

      {/* 설명 문구 */}
      {description && <p className="mt-3 max-w-[420px] body-02 text-[var(--color-yg-darkgray)]">{description}</p>}
    </div>
  );
}
