// app/survey/layout.tsx
import type { ReactNode } from 'react';

export default function SurveyLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-[var(--color-yg-white)]">
      {/* 전체 페이지 폭 */}
      <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
        {/* 내부 설문 컨텐츠 폭 */}
        <section
          className="
            mx-auto
            flex
            min-h-[calc(100dvh-56px)]
            w-full
            max-w-[640px]
            flex-col
            lg:max-w-[720px]
          "
        >
          <div className="flex flex-1 flex-col justify-center py-10 lg:py-12">
            <div className="px-3 lg:px-0">{children}</div>
          </div>

          <div className="h-8 lg:h-10" />
        </section>
      </div>
    </main>
  );
}
