import type { AiRecommendRequest, AiRecommendResponse } from '@/types/ai';

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
