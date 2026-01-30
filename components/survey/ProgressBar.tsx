type ProgressBarProps = {
  value?: number;
};

export default function ProgressBar({ value = 20 }: ProgressBarProps) {
  return (
    <div className="w-full px-6 pt-6">
      {/* background bar */}
      <div className="relative h-2 w-full rounded-full bg-[var(--color-yg-lightgray)]">
        {/* progress bar */}
        <div className="absolute left-0 top-0 h-2 rounded-full bg-[var(--color-yg-primary)] transition-all duration-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
