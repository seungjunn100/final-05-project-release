'use client';

import { useState, useRef } from 'react';
import { useSurveyAiQuestions, AiQuestion as Question } from '@/hooks/useSurveyAiQuestions';

type Props = {
  payloadSummary: string | null;
  top3Products: { name: string; description?: string }[];
};

type AnswerState = {
  loading: boolean;
  answer: string | null;
};
//가이드 질문 받아오기
export default function AiQuestion({ payloadSummary, top3Products }: Props) {
  const { questions } = useSurveyAiQuestions(payloadSummary, top3Products);

  // 질문별 상태 관리
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  // 요청 중단용 (질문별)
  const abortControllersRef = useRef<Record<string, AbortController>>({});

  if (questions.length === 0) return null;

  //질문 클릭 핸들러
  const handleClickQuestion = async (q: Question) => {
    const current = answers[q.id];

    // 이미 답변이 있으면 → 토글만
    if (current?.answer) {
      setActiveQuestionId(q.id);
      return;
    }

    // 로딩 중이면 무시
    if (current?.loading) return;

    setActiveQuestionId(q.id);

    // 상태 초기화 (이 질문만)
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { loading: true, answer: null },
    }));

    abortControllersRef.current[q.id]?.abort();
    const controller = new AbortController();
    abortControllersRef.current[q.id] = controller;

    try {
      const res = await fetch('/api/ai/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          questionKey: q.id,
          payloadSummary,
          top3Products,
        }),
      });

      if (!res.body) throw new Error('No response stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let fullAnswer = '';

      //스트리밍 처리
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullAnswer += chunk;

        setAnswers((prev) => ({
          ...prev,
          [q.id]: { loading: true, answer: fullAnswer },
        }));
      }

      // 스트리밍 완료
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { loading: false, answer: fullAnswer },
      }));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return;

      setAnswers((prev) => ({
        ...prev,
        [q.id]: {
          loading: false,
          answer: '답변을 생성하는 데 문제가 발생했어요.',
        },
      }));
    }
  };

  const activeAnswer = activeQuestionId ? answers[activeQuestionId]?.answer : null;
  const activeLoading = activeQuestionId ? answers[activeQuestionId]?.loading : false;

  return (
    <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-yg-black">더 궁금하신 점이 있으신가요?</h3>
      <p className="mb-6 text-sm text-yg-darkgray">AI에게 물어보세요</p>

      {/* 질문 리스트 */}
      <ul className="space-y-3">
        {questions.map((q) => {
          const state = answers[q.id];
          const isActive = activeQuestionId === q.id;
          const isDisabled = state?.loading || (Boolean(state?.answer) && activeQuestionId === q.id);

          return (
            <li
              key={q.id}
              onClick={() => !isDisabled && handleClickQuestion(q)}
              className={`flex items-center justify-between rounded-xl border p-4 transition
                ${isActive ? 'border-yg-primary bg-yg-lightgray' : 'border-yg-lightgray hover:bg-yg-lightgray'}
                ${isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3">
                <span>{q.icon}</span>
                <span className="text-sm font-medium">{q.text}</span>
              </div>
              <span className="text-yg-gray">▾</span>
            </li>
          );
        })}
      </ul>

      {/* 답변 영역 */}
      {activeQuestionId && (
        <div className="mt-6 rounded-xl border border-yg-lightgray bg-yg-lightgray p-4">
          <p className="mb-2 text-sm font-semibold">{questions.find((q) => q.id === activeQuestionId)?.text}</p>

          {activeLoading && !activeAnswer ? (
            <p className="text-sm text-yg-darkgray">AI가 답변을 생성 중이에요...</p>
          ) : (
            <ul className="space-y-2 text-sm text-yg-black">
              {activeAnswer
                ?.split('\n')
                .slice(0, 6)
                .map((line, i) => (
                  <li key={i} className="leading-relaxed">
                    {line}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
