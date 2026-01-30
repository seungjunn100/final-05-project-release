// components/products/ProductListSkeleton.tsx
/**
 * [ProductListSkeleton]
 * - 목록 로딩 상태 스켈레톤
 */
export default function ProductListSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="rounded-3xl bg-yg-white p-5 shadow-xl">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-yg-lightgray" />
          <div className="mt-5 space-y-3">
            <div className="h-6 w-2/3 animate-pulse rounded bg-yg-lightgray" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-yg-lightgray" />
            <div className="h-6 w-1/3 animate-pulse rounded bg-yg-lightgray" />
          </div>
        </div>
      ))}
    </div>
  );
}
