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

          return (
            <button key={c.id} type="button" onClick={() => toggle(c.id)} disabled={false} className={['h-11 w-full rounded-full text-sm font-medium shadow-md transition', active ? 'bg-yg-primary text-white border-transparent' : 'bg-yg-white text-yg-primary  hover:bg-yg-lightgray'].join(' ')}>
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-yg-darkgray">
        최대 {maxSelect}개까지 선택할 수 있어요. ({value.length}/{maxSelect})
      </p>
    </div>
  );
}
