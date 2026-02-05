import ProductSummary from '@/components/products/ProductSummary';
import TabsWrapper from './TabsWrapper';
import { SupplementItem } from '@/types/product';
import { Suspense } from 'react';

type Props = {
  params: Promise<{ _id: string }>;
};

async function getProduct(_id: number): Promise<SupplementItem | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${_id}`; // seller_id 제거
  console.log('Fetching product:', url);

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'client-id': process.env.NEXT_PUBLIC_CLIENT_ID || '' },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Response body:', text);
      return null;
    }

    const data = await res.json();
    return data.item ?? null; // item 안의 실제 객체만 반환
  } catch (err) {
    console.error('Fetch error:', err);
    return null;
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const _id = Number(resolvedParams._id);

  if (isNaN(_id)) {
    return <div className="text-center mt-10 text-red-600">잘못된 상품 ID입니다.</div>;
  }

  const seller_id = 1;
  const product = await getProduct(_id);

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-600">
        상품을 불러오지 못했습니다. <br />
        {_id}번 ID가 실제 DB에 존재하는지, seller_id가 올바른지 확인하세요.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <ProductSummary name={product.name || '상품 이름 없음'} summary={product.content || '설명 없음'} imageUrl={product.imageUrl || '/images/placeholder.png'} tags={product.mainFunctions || []} price={product.price} />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <TabsWrapper product={product} />
      </Suspense>
    </main>
  );
}
