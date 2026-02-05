// components/products/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  badges?: string[];
  href?: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('ko-KR').format(price);
}

export default function ProductCard({ id, name, price, imageUrl, badges = [], href }: ProductCardProps) {
  return (
    <Link href={href ?? `/products/${id}`} className="rounded-3xl bg-yg-white p-5 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl" aria-label={`${name} 상품 상세보기`}>
      {/* 이미지 영역 */}
      <div className="aspect-square w-full rounded-2xl bg-yg-lightgray overflow-hidden relative">
        {imageUrl ? <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" /> : <div className="w-full h-full flex items-center justify-center text-yg-darkgray text-sm">이미지 없음</div>}
      </div>

      {/* 상품 정보 */}
      <div className="mt-5">
        <h3 className="text-xl font-extrabold text-yg-black">{name}</h3>

        {badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full bg-yg-primary px-3 py-1 text-xs text-white">
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5">
          <p className="text-sm text-yg-darkgray">
            월 <span className="text-3xl font-extrabold text-yg-black">{formatPrice(price)}</span>원
          </p>
        </div>
      </div>
    </Link>
  );
}
