'use client';

export type SupplementTag = { label: string };

export type Supplement = {
  id: string;
  name: string;
  description: string;
  tags: SupplementTag[];
  badge?: string;
};

type Props = {
  item: Supplement;
  onClickDetail?: (id: string) => void;
};

export default function SupplementCard({ item, onClickDetail }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--color-yg-lightgray)] bg-white shadow-sm">
      {/* 이미지 영역 */}
      <div className="relative h-52 w-full bg-[var(--color-yg-white)]">
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-yg-lightgray)] bg-white px-3 py-1 text-xs font-semibold text-[var(--color-yg-black)]">
          <span className="h-2 w-2 rounded-full bg-[var(--color-yg-primary)]" />
          {item.badge ?? 'AI 추천'}
        </div>
        {/* 현재는 실제 상품 이미지가 없어 아이콘 사용 */}
        <div className="flex h-full items-center justify-center text-5xl">💊</div>
      </div>

      <div className="p-6">
        {/* 상품명*/}
        <h3 className="text-xl font-bold text-[var(--color-yg-black)]">{item.name}</h3>

        {/* 태그 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <TagPill key={t.label} label={t.label} />
          ))}
        </div>

        {/* 설명 */}
        <p className="mt-4 text-base leading-7 text-[var(--color-yg-darkgray)]">{item.description}</p>

        {/* 상세 보기 버튼 */}
        <button
          type="button"
          className="
    mt-5 w-full rounded-2xl
    border border-[var(--color-yg-primary)]
    bg-white
    px-4 py-4
    text-base font-semibold
    text-[var(--color-yg-primary)]
    transition
    hover:bg-[var(--color-yg-primary)]/5
    hover:border-[var(--color-yg-primary)]
  "
          onClick={() => onClickDetail?.(item.id)}
        >
          상세 보기
        </button>
      </div>
    </article>
  );
}
function TagPill({ label }: { label: string }) {
  return (
    <span
      className="
        rounded-full
        border border-[var(--color-yg-primary)]
        bg-[color:var(--color-yg-primary)]/10
        px-3 py-1
        text-sm font-normal
        text-[var(--color-yg-primary)]
      "
    >
      {label}
    </span>
  );
}
