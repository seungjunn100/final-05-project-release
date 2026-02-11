// app/products/page.tsx  ✅
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: '상품 리스트',
  description: '카테고리별 상품을 한눈에 확인하세요.',
  openGraph: {
    title: '상품 리스트',
    description: '카테고리별 상품을 한눈에 확인하세요.',
    images: [
      {
        url: '/og/global.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Page() {
  return <ProductsClient />;
}
