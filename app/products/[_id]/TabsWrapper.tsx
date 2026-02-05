'use client';

import { useState } from 'react';
import ProductInfoTabs from '@/components/products/ProductInfoTabs';
import ProductInfoSection from '@/components/products/ProductInfoSection';
import { SupplementItem } from '@/types/product';

type TabKey = 'features' | 'nutrition' | 'intake' | 'cautions';

type Props = {
  product: SupplementItem;
};

export default function TabsWrapper({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('features');

  const handleChangeTab = (key: TabKey) => {
    setActiveTab(key);
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="sticky top-16 z-20 bg-white">
        <ProductInfoTabs active={activeTab} onChange={handleChangeTab} />
      </div>
      <ProductInfoSection features={product.mainFunctions || []} nutritionFacts={product.nutritionInfoExample?.nutrients || []} intake={product.intakeGuide} cautions={product.precautions || []} />
    </>
  );
}
