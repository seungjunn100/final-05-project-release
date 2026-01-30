type Option = { id: string; label: string };

type Props = {
  options: Option[];
  value: string[];
  onChange?: (next: string[]) => void;
  maxSelect?: number;
};

export default function MultiChoice({ options, value, onChange, maxSelect }: Props) {
  const toggle = (id: string) => {
    const has = value.includes(id);
    if (has) {
      onChange?.(value.filter((v) => v !== id));
      return;
    }
    if (maxSelect && value.length >= maxSelect) return;
    onChange?.([...value, id]);
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {options.map((opt) => {
        const active = value.includes(opt.id);

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            className={[
              'h-11 w-full rounded-full border px-4 text-left text-sm font-medium',
              'flex items-center justify-between',
              active ? 'border-transparent bg-[var(--color-yg-primary)] text-white' : 'border-[var(--color-yg-lightgray)] bg-white text-[var(--color-yg-black)] hover:bg-[var(--color-yg-white)]',
            ].join(' ')}
          >
            <span>{opt.label}</span>
            <span className={active ? 'opacity-100' : 'opacity-30'}>✓</span>
          </button>
        );
      })}

      {maxSelect && <p className="mt-1 text-xs text-[var(--color-yg-darkgray)]">최대 {maxSelect}개까지 선택할 수 있어요.</p>}
    </div>
  );
}
