import { NextResponse } from 'next/server';
import type { AiRecommendRequest, AiRecommendResponse } from '@/types/ai';

//openai,env 사용으로 node
export const runtime = 'nodejs';

//AI 응답 검증
function isValidResponse(data: unknown): data is AiRecommendResponse {
  if (!data || typeof data !== 'object') return false;

  const d = data as Record<string, unknown>;

  const okSummary = typeof d.summary === 'string' && d.summary.trim().length > 0;

  const okRanked =
    Array.isArray(d.ranked) &&
    d.ranked.length > 0 &&
    d.ranked.every((r) => {
      if (!r || typeof r !== 'object') return false;

      const item = r as Record<string, unknown>;

      return typeof item.id === 'string' && typeof item.score === 'number' && item.score >= 0 && item.score <= 100 && typeof item.reason === 'string';
    });

  const okTop3 = Array.isArray(d.top3) && d.top3.length > 0 && d.top3.every((x) => typeof x === 'string');

  return okSummary && okRanked && okTop3;
}

//top3 보정
function clampTop(top: string[], candidatesIds: Set<string>, pickCount: number) {
  const uniq: string[] = [];
  for (const id of top) {
    if (!candidatesIds.has(id)) continue;
    if (uniq.includes(id)) continue;
    uniq.push(id);
    if (uniq.length >= pickCount) break;
  }
  return uniq;
}

//프롬프트 생성(추천 알고리즘 역할 담당)
function buildPrompt(req: AiRecommendRequest) {
  return `
너는 건강기능식품 추천 전문가다.
주어진 "설문 요약(payload)"과 "후보 상품(candidates)" 중에서 사용자에게 가장 적합한 상품을 추천해라.

규칙:
- 반드시 JSON만 출력한다. (설명/마크다운/코드블록 금지)
- 출력 JSON은 아래 스키마를 정확히 따른다.
- score는 0~100 정수.
- reason은 1~2문장, 사용자가 이해 가능한 말로 간단히.
- top3는 ranked 기준 상위 pickCount개 id를 순서대로 넣는다.
- candidates에 없는 id는 절대 포함하지 않는다.
- summary는 존댓말 2~3문장으로, 120~220자 정도로 작성한다.
  - 1문장: 선택 카테고리를 반영한 현재 상태 요약
  - 2문장: 왜 이 조합이 맞는지 설명
  - (선택) 3문장: 섭취/생활 팁 1개 (과장/의학적 단정 금지)

summary 예시(형식만 참고):
"최근에는 체지방 관리와 함께 피부 컨디션까지 신경 쓰고 계신 상태예요.
그래서 에너지 대사·지방 연소를 돕는 성분과 피부 탄력/모발 건강에 도움 되는 조합을 우선으로 추천했어요.
가능하면 식후에 꾸준히 섭취하고, 수분 섭취도 함께 챙겨보세요."

출력 스키마:
{
  "summary": string,
  "ranked": [{ "id": string, "score": number, "reason": string }],
  "top3": string[]
}

입력:
payload = ${JSON.stringify(req.payload)}
pickCount = ${req.pickCount}
candidates = ${JSON.stringify(req.candidates)}
`.trim();
}

//openai 호출
async function callOpenAIJson(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You output strictly valid JSON.' },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;
  if (!content || typeof content !== 'string') throw new Error('Empty OpenAI content');

  return JSON.parse(content);
}

//post 메인 핸들러
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AiRecommendRequest;

    if (!body?.payload || !Array.isArray(body?.candidates) || typeof body?.pickCount !== 'number') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (body.candidates.length === 0) {
      return NextResponse.json({ error: 'No candidates' }, { status: 400 });
    }

    const prompt = buildPrompt(body);
    const raw: unknown = await callOpenAIJson(prompt);

    if (!isValidResponse(raw)) {
      return NextResponse.json({ error: 'Invalid AI response shape' }, { status: 502 });
    }
    //추천이 db범위에 있는지 검지
    const candidateIds = new Set(body.candidates.map((c) => c.id));
    const safeTop = clampTop(raw.top3, candidateIds, body.pickCount);

    if (safeTop.length < body.pickCount) {
      for (const r of raw.ranked) {
        if (safeTop.length >= body.pickCount) break;
        if (!candidateIds.has(r.id)) continue;
        if (safeTop.includes(r.id)) continue;
        safeTop.push(r.id);
      }
    }

    const safe: AiRecommendResponse = {
      summary: raw.summary,
      ranked: raw.ranked,
      top3: safeTop,
    };

    return NextResponse.json(safe, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
