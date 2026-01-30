// lib/api/product.ts
import type { SupplementItem } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

export type ApiResponse<T> = {
  ok: 1 | 0;
  data?: T;
  message?: string;
};

function assertEnv(): { apiUrl: string; clientId: string } {
  if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 없습니다.');
  if (!CLIENT_ID) throw new Error('NEXT_PUBLIC_CLIENT_ID 환경 변수가 없습니다.');
  return { apiUrl: API_URL, clientId: CLIENT_ID };
}

function normalizeListResponse(json: unknown): ApiResponse<SupplementItem[]> {
  const j = json as any;
  const list: unknown = j?.data ?? j?.items ?? j?.item ?? j?.list ?? [];

  if (j?.ok === 1 && Array.isArray(list)) return { ok: 1, data: list as SupplementItem[] };
  return { ok: 0, data: [], message: j?.message ?? '상품 목록 조회 실패' };
}

export async function getProducts(): Promise<ApiResponse<SupplementItem[]>> {
  try {
    const { apiUrl, clientId } = assertEnv();

    const url = `${apiUrl}/products`;

    const response = await fetch(url, {
      headers: { 'Client-Id': clientId },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { ok: 0, data: [], message: `HTTP error! status: ${response.status}` };
    }

    const json = (await response.json()) as unknown;
    return normalizeListResponse(json);
  } catch (err: unknown) {
    return {
      ok: 0,
      data: [],
      message: err instanceof Error ? err.message : '상품 목록 조회 실패',
    };
  }
}
