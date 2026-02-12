type Choice = {
  value: number;
  label: string;
};

type Props = {
  value?: number;
  onChange?: (v: number) => void;
  choices: Choice[];
};

export default function ScaleChoice({ value, onChange, choices }: Props) {
  // choices 없으면 렌더링 X
  if (!choices || choices.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3">
        {choices.map((item) => {
          const active = value === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange?.(item.value)}
              className={['h-11 w-full rounded-full  px-5 text-left text-sm font-medium shadow-md transition', active ? 'bg-yg-primary text-white border-transparent' : 'bg-yg-white text-yg-primary  hover:bg-yg-lightgray'].join(' ')}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
