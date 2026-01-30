// components/products/ProductGrid.tsx
import ProductCard from './ProductCard';
import type { SupplementItem } from '@/types/product';

type Props = {
  items: SupplementItem[];
  renderLink?: (id: SupplementItem['_id']) => string;
};

/**
 * [ProductGrid]
 * - 카드 그리드 레이아웃
 */
export default function ProductGrid({ items, renderLink }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item._id} item={item} href={renderLink ? renderLink(item._id) : `/products/${item._id}`} />
      ))}
    </div>
  );
}
