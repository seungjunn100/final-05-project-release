// components/products/ProductGrid.tsx
import ProductCard from './ProductCard';
import type { SupplementItem } from '@/types/product';

type Props = {
  items: SupplementItem[];
  renderLink?: (id: SupplementItem['_id']) => string;
};

const categoryImages: Record<string, string> = {
  diet: '/images/category/diet.png', // 다이어트
  eye: '/images/category/eye_health.png', // 눈건강
  gut: '/images/category/gut_health.png', // 장건강
  immune_fatigue: '/images/category/immune_energy.png', // 면역, 피로
  skin_hair: '/images/category/skin_hair.png', // 피부, 모발
  women: '/images/category/womens_health.png', // 여성건강
  brain: '/images/category/brain_focus.png', // 뇌, 집중력
  blood_flow: '/images/category/circulation.png', // 혈액순환
  bone_joint: '/images/category/bone_joint.png', // 뼈, 관절
  general: '/images/category/general.png', //종합건강
};

export default function ProductGrid({ items, renderLink }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ProductCard key={item._id} id={Number(item._id)} name={item.name} price={item.price} imageUrl={categoryImages[item.categoryId] ?? '/images/category/default.png'} badges={item.mainFunctions ?? []} href={renderLink ? renderLink(item._id) : `/products/${item._id}`} />
      ))}
    </div>
  );
}
