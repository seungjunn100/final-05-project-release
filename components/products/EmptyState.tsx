// components/products/EmptyState.tsx
type Props = {
  title: string;
  description?: string;
};

/**
 * [EmptyState]
 * - 목록이 비었을 때 표시
 */
export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-4 text-6xl" aria-hidden="true">
        📦
      </div>
      <h2 className="mb-2 text-lg font-semibold text-yg-black">{title}</h2>
      {description && <p className="text-sm text-yg-darkgray">{description}</p>}
    </div>
  );
}
