// components/products/ProductCard.tsx
import Link from 'next/link';
import type { SupplementItem } from '@/types/product';

type Props = {
  item: SupplementItem;
  href: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR').format(price);
}

/**
 * [ProductCard]
 * - 상품 1개 카드(Item)
 */
export default function ProductCard({ item, href }: Props) {
  const badges: string[] = item.mainNutrients?.slice(0, 2) ?? [];

  return (
    <Link href={href} className="rounded-3xl bg-yg-white p-5 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl" aria-label={`${item.name} 상품 상세보기`}>
      <div className="aspect-square w-full rounded-2xl bg-yg-lightgray" aria-hidden="true" />

      <div className="mt-5">
        <h3 className="text-xl font-extrabold text-yg-black">{item.name}</h3>
        <p className="mt-1 text-sm text-yg-darkgray">상품 캡션</p>

        {badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-yg-primary px-3 py-1 text-xs text-white">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-end justify-between">
          <p className="text-sm text-yg-darkgray">
            월 <span className="text-3xl font-extrabold text-yg-black">{formatPrice(item.price)}</span>원
          </p>

          <div className="text-yg-secondary" aria-label="별점">
            ★★★★★
          </div>
        </div>
      </div>
    </Link>
  );
}
