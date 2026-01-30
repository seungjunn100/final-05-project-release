'use client';

import { useState } from 'react';

type GuideId = 'summary' | 'howto' | 'caution';
type AnswerState = 'idle' | 'loading' | 'success' | 'error';

// 고정 질문 목록
const GUIDE = [
  { id: 'summary' as const, icon: '🧾', text: '현재 내 상태를 한 번 더 정리해서 말해줘' },
  { id: 'howto' as const, icon: '💊', text: '이 영양제들은 어떻게 먹으면 좋을까?' },
  { id: 'caution' as const, icon: '⚠️', text: '섭취할 때 주의할 점이 있을까?' },
];

export default function AiQuestion() {
  const [openId, setOpenId] = useState<GuideId | null>(null);
  const [state, setState] = useState<AnswerState>('idle');
  const [answer, setAnswer] = useState<string>('');

  const toggle = (id: GuideId) => {
    if (openId === id) {
      setOpenId(null);
      setState('idle');
      setAnswer('');
      return;
    }

    setOpenId(id);

    setState('loading');
    setAnswer('');
    setTimeout(() => {
      setState('success');
      // AI응답으로 교체
      setAnswer('예시 답변입니다...');
    }, 600);
  };

  //에러 처리
  const retry = () => {
    if (!openId) return;
    setState('loading');
    setTimeout(() => {
      setState('success');
      setAnswer('예시 답변입니다...');
    }, 600);
  };

  return (
    <section className="mb-6">
      <div className="rounded-2xl border border-[var(--color-yg-lightgray)] bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-[var(--color-yg-black)]">더 궁금하신 점이 있으신가요?</h2>
        <p className="mt-1 text-sm font-normal text-[var(--color-yg-darkgray)]">AI에게 물어보세요</p>

        <div className="mt-4 space-y-3">
          {GUIDE.map((g) => (
            <div key={g.id}>
              <button type="button" className="flex w-full items-center gap-4 rounded-2xl borde border-[var(--color-yg-lightgray)] bg-white px-5 py-5 text-left shadow-sm hover:bg-[var(--color-yg-white)]" onClick={() => toggle(g.id)}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-yg-white)]">{g.icon}</span>
                <span className="text-base font-semibold text-[var(--color-yg-black)]">{g.text}</span>
                <span className="ml-auto text-[var(--color-yg-gray)]">{openId === g.id ? '▲' : '▼'}</span>
              </button>

              {openId === g.id && (
                <div className="mt-2 rounded-2xl border border-[var(--color-yg-lightgray)] bg-[var(--color-yg-white)] p-5">
                  {state === 'loading' && <div className="text-sm font-normal text-[var(--color-yg-darkgray)]">답변을 생성 중이에요...</div>}

                  {state === 'success' && <p className="text-base font-normal leading-7 text-[var(--color-yg-darkgray)]">{answer}</p>}

                  {state === 'error' && (
                    <div className="space-y-3">
                      <p className="text-sm font-normal text-[var(--color-yg-darkgray)]">답변을 생성하는 데 문제가 발생했어요. 잠시 후 다시 시도해주세요.</p>

                      <button type="button" className="rounded-2xl border border-[var(--color-yg-secondary)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-yg-secondary)]" onClick={retry}>
                        다시 시도하기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
