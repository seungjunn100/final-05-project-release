// components/products/ProductSummary.tsx
import React from 'react';

type ProductSummaryProps = {
  name: string;
  summary: string;
  brand?: string;
  rating?: number;
  imageUrl?: string;
  tags?: string[];
  price?: number;
};

export default function ProductSummary({ name, summary, brand, rating, imageUrl, tags, price }: ProductSummaryProps) {
  return (
    <section className="rounded-lg bg-yg-white p-6 shadow">
      <div className="grid grid-cols-12 gap-6">
        {/* 이미지 */}
        <div className="col-span-5">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-yg-lightgray">{imageUrl ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-yg-darkgray">이미지 없음</div>}</div>
        </div>

        {/* 텍스트 */}
        <div className="col-span-7">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tags?.map((t) => (
              <span key={t} className="rounded-full bg-yg-secondary px-2 py-1 text-xs font-semibold text-yg-black">
                {t}
              </span>
            ))}
            {brand && <span className="text-sm font-medium text-yg-darkgray">{brand}</span>}
          </div>

          <h1 className="text-2xl font-bold text-yg-black">{name}</h1>
          <p className="mt-2 text-sm leading-6 text-yg-darkgray">{summary}</p>

          {price !== undefined && <div className="mt-4 text-lg font-bold text-green-600">{price.toLocaleString()}원</div>}
        </div>
      </div>
    </section>
  );
}
