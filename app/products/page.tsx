// app/products/page.tsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import CategoryTabs from '@/components/products/CategoryTabs';
import ProductGrid from '@/components/products/ProductGrid';
import ProductListSkeleton from '@/components/products/ProductListSkeleton';
import EmptyState from '@/components/products/EmptyState';
import ErrorState from '@/components/products/ErrorState';
import { getProducts } from '@/lib/api/products';
import type { Category, SupplementItem, SortType } from '@/types/product';

export default function ProductsPage() {
  const categories: Category[] = useMemo(
    () => [
      { id: 'all', name: '전체' },
      { id: 'diet', name: '다이어트' },
      { id: 'eye', name: '눈건강' },
      { id: 'gut', name: '장건강' },
      { id: 'immune_fatigue', name: '면역•피로' },
      { id: 'skin_hair', name: '피부•모발' },
      { id: 'women', name: '여성건강' },
      { id: 'brain', name: '뇌•집중력' },
      { id: 'blood_flow', name: '혈액순환' },
      { id: 'bone_joint', name: '뼈•관절' },
      { id: 'general', name: '종합건강' },
    ],
    []
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [sort, setSort] = useState<SortType>('popular');

  // ✅ 원본 데이터(서버에서 받은 전체 목록)
  const [allProducts, setAllProducts] = useState<SupplementItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [retryKey, setRetryKey] = useState(0);

  // ✅ API 호출: 이제 category/sort 의존성 제거 (서버가 지원 안 하니까)
  useEffect(() => {
    let alive = true;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await getProducts();

        if (!alive) return;

        if (res.ok === 1) {
          console.log('products : ', res.item);
          setAllProducts(res.item ?? []);
        } else {
          setAllProducts([]);
          setError(res.message ?? '상품을 불러오는데 실패했습니다.');
        }
      } catch (err: unknown) {
        if (!alive) return;
        setAllProducts([]);
        setError(err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.');
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      alive = false;
    };

    console.log('allProducts:', allProducts);
    console.log('selectedCategoryId:', selectedCategoryId);
  }, [retryKey]);

  const handleRetry = () => setRetryKey((k) => k + 1);

  // ✅ 프론트에서 필터/정렬 처리
  const products = useMemo(() => {
    // 1) 카테고리 필터
    const filtered = selectedCategoryId === 'all' ? allProducts : allProducts.filter((p) => p.categoryId === selectedCategoryId);

    // 2) 정렬
    const sorted = [...filtered];
    if (sort === 'priceLow') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'priceHigh') sorted.sort((a, b) => b.price - a.price);
    // popular: 서버 지원 없으니 일단 원본 순서 유지(또는 id 기준 등으로 임시 정렬 가능)

    return sorted;
  }, [allProducts, selectedCategoryId, sort]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="text-lg font-semibold tracking-tight text-yg-black">상품 리스트</h1>
      </header>

      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs categories={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />

        <div className="flex items-center justify-end gap-2">
          <label className="text-xs text-yg-darkgray" htmlFor="sort">
            정렬
          </label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortType)} className="h-9 rounded-lg border border-yg-lightgray bg-white px-3 text-sm" aria-label="상품 정렬 방식 선택">
            <option value="priceLow">가격 낮은순</option>
            <option value="priceHigh">가격 높은순</option>
          </select>
        </div>
      </section>

      <section className="min-h-[50vh]">
        {isLoading && <ProductListSkeleton />}

        {!isLoading && error && <ErrorState title="상품을 불러오지 못했어요." description={error} onRetry={handleRetry} />}

        {!isLoading && !error && products.length === 0 && <EmptyState title="상품이 없어요." description="다른 카테고리를 선택해보세요." />}

        {!isLoading && !error && products.length > 0 && <ProductGrid items={products} renderLink={(id) => `/products/${id}`} />}
      </section>

      <footer className="mt-10 flex items-center justify-center gap-2">
        <button type="button" className="h-9 rounded-lg border border-yg-lightgray px-3 text-sm disabled:opacity-50" disabled>
          이전
        </button>
        <span className="text-sm text-yg-darkgray">1 / 10</span>
        <button type="button" className="h-9 rounded-lg border border-yg-lightgray px-3 text-sm disabled:opacity-50" disabled>
          다음
        </button>
      </footer>
    </main>
  );
}
