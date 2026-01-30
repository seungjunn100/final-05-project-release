type Category = { id: string; label: string; section?: string };

type Props = {
  categories: Category[];
  value: string[];
  onChange?: (next: string[]) => void;
  maxSelect?: number;
};

export default function Category({ categories, value, onChange, maxSelect = 2 }: Props) {
  const toggle = (id: string) => {
    const has = value.includes(id);
    if (has) return onChange?.(value.filter((v) => v !== id));
    if (value.length >= maxSelect) return;
    onChange?.([...value, id]);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => {
          const active = value.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={['h-11 rounded-full border text-sm font-medium', active ? 'border-transparent bg-[var(--color-yg-primary)] text-white' : 'border-[var(--color-yg-lightgray)] bg-white text-[var(--color-yg-black)] hover:bg-[var(--color-yg-white)]'].join(' ')}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[var(--color-yg-darkgray)]">
        최대 {maxSelect}개까지 선택할 수 있어요. ({value.length}/{maxSelect})
      </p>
    </div>
  );
}
