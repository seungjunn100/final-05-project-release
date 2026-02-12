'use client';

export default function SupplementSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-2 rounded-2xl  bg-yg-white p-6 shadow-sm">
          <div className="h-4 w-1/3 bg-yg-lightgray rounded" />
          <div className="h-4 w-2/3 bg-yg-lightgray rounded" />
          <div className="h-4 w-1/2 bg-yg-lightgray rounded" />
        </div>
      ))}
    </div>
  );
}
