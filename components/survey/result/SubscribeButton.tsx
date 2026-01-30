'use client';

type Props = {
  onClick?: () => void;
};

export default function SubscribeButton({ onClick }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-yg-lightgray)] bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <button type="button" className="w-full rounded-2xl bg-[var(--color-yg-primary)] px-4 py-5 text-base font-semibold text-white shadow-sm" onClick={onClick}>
          맞춤 영양제 구독하기
        </button>
      </div>
    </div>
  );
}
