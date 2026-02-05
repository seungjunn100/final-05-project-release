// lib/api/products.ts
import type { SupplementItem } from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;

export type ApiResponse<T> = {
  ok: 1 | 0;
  item?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
};

export async function getProducts(): Promise<ApiResponse<SupplementItem[]>> {
  try {
    const url = `${API_URL}/products`;

    const res = await fetch(url, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'no-store',
    });

    const json = await res.json();

    console.log('API raw response:', json);

    if (json.ok !== 1 || !Array.isArray(json.item)) {
      return {
        ok: 0,
        item: [],
        message: json.message ?? '상품 목록 조회 실패',
      };
    }

    return {
      ok: 1,
      item: json.item,
      pagination: json.pagination,
    };
  } catch (e) {
    console.error(e);
    return {
      ok: 0,
      item: [],
      message: '상품 목록 조회 실패',
    };
  }
}
