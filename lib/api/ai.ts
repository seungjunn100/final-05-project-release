import type { AiRecommendRequest, AiRecommendResponse, AiAnswerRequest } from '@/types/ai';

// AI 추천 API 요청
export async function postAiRecommend(url: string, { arg }: { arg: AiRecommendRequest }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'AI recommend failed');
  }

  return (await res.json()) as AiRecommendResponse;
}

//  AI 답변 스트리밍 요청(한 글자씩 받아서 출력하기)
export async function postAiAnswer(payload: AiAnswerRequest): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch('/api/ai/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok || !res.body) {
    const text = await res.text();
    throw new Error(text || 'AI answer failed');
  }

  return res.body;
}
