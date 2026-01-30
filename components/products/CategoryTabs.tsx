// components/products/CategoryTabs.tsx
'use client';

import type { Category } from '@/types/product';

type Props = {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
};

/**
 * [CategoryTabs]
 * - 카테고리 탭 UI (가로 스크롤)
 */
export default function CategoryTabs({ categories, selectedId, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="상품 카테고리">
      {categories.map((c) => {
        const active = c.id === selectedId;
        return (
          <button key={c.id} type="button" aria-pressed={active} onClick={() => onSelect(c.id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${active ? 'border-yg-primary bg-yg-primary text-white' : 'border-yg-lightgray bg-white text-yg-darkgray hover:bg-yg-white'}`}>
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
