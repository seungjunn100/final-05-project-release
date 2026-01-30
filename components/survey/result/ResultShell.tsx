'use client';

import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function ResultShell({ title, children }: Props) {
  return (
    <main className="min-h-screen bg-[var(--color-yg-white)] text-[var(--color-yg-black)]">
      <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8">
        {title && (
          <section className="mb-6">
            <div className="rounded-2xl border border-[var(--color-yg-lightgray)] bg-white px-6 py-6 shadow-sm">
              <h1 className="text-center text-4xl font-bold">{title}</h1>
            </div>
          </section>
        )}
        {children}
      </div>
    </main>
  );
}
