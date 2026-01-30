type ProductSummaryProps = {
  name: string;
  summary: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  tags?: string[];
};

export default function ProductSummary({ name, summary, brand, rating, reviewCount, imageUrl, tags }: ProductSummaryProps) {
  return (
    <section className="rounded-lg bg-yg-white p-6 shadow">
      <div className="grid grid-cols-12 gap-6">
        {/* 이미지 */}
        <div className="col-span-5">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-yg-lightgray">{imageUrl ? <img src={imageUrl} alt={name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-yg-darkgray">이미지 없음</div>}</div>
        </div>

        {/* 텍스트 */}
        <div className="col-span-7">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {tags?.map((t) => (
              <span key={t} className="rounded-full bg-yg-secondary px-2 py-1 text-xs font-semibold text-yg-black">
                {t}
              </span>
            ))}
            {brand && <span className="text-sm font-medium text-yg-darkgray">{brand}</span>}
          </div>

          <h1 className="text-2xl font-bold text-yg-black">{name}</h1>
          <p className="mt-2 text-sm leading-6 text-yg-darkgray">{summary}</p>

          {(rating !== undefined || reviewCount !== undefined) && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              {rating !== undefined && <span className="font-semibold text-yg-black">★ {rating}</span>}
              {reviewCount !== undefined && <span className="text-yg-darkgray">리뷰 {reviewCount.toLocaleString()}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
