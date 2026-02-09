import { NextRequest } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

//요청 유효성 검사(zod)
const BodySchema = z.object({
  questionKey: z.enum(['summary', 'howTo', 'caution']),
  payloadSummary: z.string(),
  top3Products: z
    .array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .min(1),
});

//POST 핸들러
export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = BodySchema.safeParse(json);

  if (!parsed.success) {
    return new Response('Invalid request', { status: 400 });
  }

  const { questionKey, payloadSummary, top3Products } = parsed.data;

  //프롬프트
  const systemPrompt = `
너는 건강 정보를 일반인이 이해하기 쉽게 설명하는 AI야.

규칙:
- 반드시 한국어로 답변해
- 답변은 최대 6줄 이내로만 작성해
- 한 줄에는 하나의 핵심만 담아
- 불필요한 설명은 생략해
- 나열이 필요한 경우 bullet(•) 형식으로 작성해
- 의료 진단이나 처방처럼 보이지 않게 설명해
`.trim();

  //유저 프롬프트
  const userPrompt = `
사용자의 상태:
${payloadSummary}

추천된 건강식품:
${top3Products.map((p, i) => `${i + 1}. ${p.name}${p.description ? ` - ${p.description}` : ''}`).join('\n')}

질문:
${getQuestionText(questionKey)}

답변 작성 규칙:
- 최대 6줄
- 각 줄은 짧고 명확하게
- 읽기 쉬운 문장으로 작성
`.trim();

  //open AI 호출
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      stream: true, //실시간 응답
    }),
  });

  if (!openaiRes.ok || !openaiRes.body) {
    return new Response('OpenAI 응답 오류', { status: 500 });
  }

  //스트리밍 응답 처리
  const stream = new ReadableStream({
    async start(controller) {
      const reader = openaiRes.body!.getReader();
      const decoder = new TextDecoder('utf-8');
      const encoder = new TextEncoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.startsWith('data:'));

        for (const line of lines) {
          const jsonStr = line.replace(/^data:\s*/, '');
          if (jsonStr === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          } catch {
            // JSON 파싱 실패는 무시
          }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

//가이드 질문 생성
function getQuestionText(key: 'summary' | 'howTo' | 'caution'): string {
  switch (key) {
    case 'summary':
      return '추천된 건강기능식품과 현재 상태를 기반으로 건강 상태를 간단히 정리해줘';
    case 'howTo':
      return '추천된 건강식품은 어떻게 복용하면 좋을까?';
    case 'caution':
      return '건강식품을 섭취할 때 주의해야 할 점이 있을까?';
  }
}
