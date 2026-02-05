type Category = { id: string; label: string; section?: string };

type Props = {
  categories: Category[];
  value: string[];
  onChange?: (next: string[]) => void;
  maxSelect?: number;
};

export default function Category({ categories, value, onChange, maxSelect = 2 }: Props) {
  const isMaxSelected = value.length >= maxSelect;

  const toggle = (id: string) => {
    const has = value.includes(id);

    // 선택 해제 가능
    if (has) {
      onChange?.(value.filter((v) => v !== id));
      return;
    }

    // 초과 방지
    if (isMaxSelected) return;

    onChange?.([...value, id]);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => {
          const active = value.includes(c.id);
          const disabled = isMaxSelected && !active;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              disabled={disabled}
              aria-disabled={disabled}
              className={[
                'h-11 rounded-full border text-sm font-medium transition',
                active ? 'border-transparent bg-[var(--color-yg-primary)] text-white' : 'border-[var(--color-yg-lightgray)] bg-white text-[var(--color-yg-black)] hover:bg-[var(--color-yg-white)]',
                disabled ? 'cursor-not-allowed opacity-40' : '',
              ].join(' ')}
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
