'use client';

type Props = {
  summary: string | null;
  isLoading?: boolean;
  isError?: boolean;
};

export default function ConditionSummaryCard({ summary, isLoading, isError }: Props) {
  return (
    <section className="mb-8">
      <div className="rounded-2xl  bg-yg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yg-white">🤖</span>
          <h2 className="text-xl font-bold">컨디션 분석</h2>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-yg-lightgray/50" />
            <div className="h-4 w-full rounded bg-yg-lightgray/50" />
            <div className="h-4 w-2/3 rounded bg-yg-lightgray)" />
          </div>
        ) : isError || !summary ? (
          <div className="rounded-2xl bg-yg-white p-4 text-sm text-yg-darkgray">분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.</div>
        ) : (
          <p className="text-base leading-7 text-yg-darkgray">{summary}</p>
        )}
      </div>
    </section>
  );
}
