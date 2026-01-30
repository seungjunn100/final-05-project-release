// components/products/ErrorState.tsx
type Props = {
  title: string;
  description?: string;
  onRetry?: () => void;
};

/**
 * [ErrorState]
 * - API 실패 등 에러 상태 표시
 */
export default function ErrorState({ title, description, onRetry }: Props) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="mb-2 text-lg font-semibold text-yg-black">{title}</h2>
      {description && <p className="mb-4 text-sm text-yg-darkgray">{description}</p>}
      {onRetry && (
        <button type="button" onClick={onRetry} className="rounded-lg bg-yg-black px-4 py-2 text-sm text-white transition hover:opacity-90">
          다시 시도
        </button>
      )}
    </div>
  );
}
