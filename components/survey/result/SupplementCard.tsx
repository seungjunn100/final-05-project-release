'use client';
import Image from 'next/image';

export type SupplementTag = { label: string };

export type Supplement = {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: SupplementTag[];
  badge?: string;
  imageUrl?: string;
};

type Props = {
  item: Supplement;
  onClickDetail?: (id: string) => void;
};

function TagPill({ label }: { label: string }) {
  return (
    <span
      className="
        rounded-full
        bg-yg-secondary
        px-3 py-1
        text-xs
        text-white
      "
    >
      {label}
    </span>
  );
}

export default function SupplementCard({ item, onClickDetail }: Props) {
  return (
    <article
      className="
        rounded-2xl
        bg-yg-white
        p-5
        shadow-md
      "
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-square w-full h-70 overflow-hidden rounded-2xl bg-yg-lightgray">
        {item.badge && <div className="absolute left-4 top-4 z-20 rounded-full bg-white px-3 py-1 text-xs font-semibold text-yg-secondary shadow-sm">{item.badge}</div>}

        {item.imageUrl ? <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" /> : <div className="flex h-full items-center justify-center text-4xl">💊</div>}
      </div>

      {/* 상품 정보 */}
      <div className="mt-5">
        <h3 className="text-xl font-extrabold text-yg-black">{item.name}</h3>

        {/* 태그 */}
        {item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <TagPill key={t.label} label={t.label} />
            ))}
          </div>
        )}

        {/* 설명 */}
        <p className="mt-4 text-sm leading-6 text-yg-darkgray">{item.description}</p>

        {/* 버튼 */}
        <button
          type="button"
          onClick={() => onClickDetail?.(item.id)}
          className="
            mt-5 w-full rounded-[50px]
            bg-yg-secondary
            py-3
            text-sm font-semibold text-white
            transition
            hover:bg-yg-secondary/90
          "
        >
          상세 보기
        </button>
      </div>
    </article>
  );
}
