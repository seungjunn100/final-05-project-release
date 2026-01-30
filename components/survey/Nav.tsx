type Props = {
  primaryLabel: string; // "다음" | "제출" | "시작하기"
  onPrimary?: () => void;
  disabledPrimary?: boolean;

  secondaryLabel?: string; // "이전"
  onSecondary?: () => void;
  disabledSecondary?: boolean;
};

export default function BottomNav({ primaryLabel, onPrimary, disabledPrimary, secondaryLabel, onSecondary, disabledSecondary }: Props) {
  return (
    <div className="sticky bottom-0 left-0 right-0 mt-6 bg-[var(--color-yg-white)] pb-4 pt-3">
      <div className="flex gap-3">
        {secondaryLabel && (
          <button type="button" onClick={onSecondary} disabled={disabledSecondary} className={['h-11 flex-1 rounded-full border text-sm font-medium', 'border-[var(--color-yg-lightgray)] text-[var(--color-yg-black)]', disabledSecondary ? 'opacity-40' : 'hover:opacity-90'].join(' ')}>
            {secondaryLabel}
          </button>
        )}

        <button type="button" onClick={onPrimary} disabled={disabledPrimary} className={['h-11 flex-1 rounded-full text-sm font-semibold', disabledPrimary ? 'bg-[var(--color-yg-lightgray)] text-[var(--color-yg-darkgray)]' : 'bg-[var(--color-yg-black)] text-white hover:opacity-90'].join(' ')}>
          {primaryLabel}
        </button>
      </div>
    </div>
  );
}
