'use client';

import { useState } from 'react';
import ProductInfoSection from '@/components/products/ProductInfoSection';
import ProductInfoTabs from '@/components/products/ProductInfoTabs';
import ProductSummary from '@/components/products/ProductSummary';
import { productDetailMock } from '@/mock/productDetail.mock';

type TabKey = 'features' | 'nutrition' | 'intake' | 'cautions';

export default function ProductDetailPage() {
  const product = productDetailMock;

  const [activeTab, setActiveTab] = useState<TabKey>('features');

  const handleChangeTab = (key: TabKey) => {
    setActiveTab(key);

    const el = document.getElementById(key);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      {/* ✅ 정보 페이지: 우측 카드 없음, 단일 컬럼 */}
      <ProductSummary name={product.name} summary={product.summary} brand={product.brand} rating={product.rating} reviewCount={product.reviewCount} imageUrl={product.imageUrl} tags={product.tags} />

      {/* ✅ 탭: 스크롤 내려도 항상 보이게 */}
      <div className="sticky top-16 z-20">
        <ProductInfoTabs active={activeTab} onChange={handleChangeTab} />
      </div>

      {/* ✅ 상세 섹션 */}
      <ProductInfoSection features={product.features} nutritionFacts={product.nutritionFacts} intake={product.intake} cautions={product.cautions} />
    </main>
  );
}
