'use client';

type Props = {
  onClick?: () => void;
};

export default function SubscribeButton({ onClick }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-yg-lightgray bg-white/90 backdrop-blur">
      <div className="mx-auto w-181 max-w-6xl px-4 py-4">
        <button
          type="button"
          onClick={onClick}
          className="
          w-full rounded-xl bg-yg-primary
          px-4 py-3.5 text-sm font-semibold text-white shadow-sm
          transition-colors duration-200
          hover:bg-yg-primary/90 active:bg-yg-primary/80
        "
        >
          맞춤 영양제 구독하기
        </button>
      </div>
    </div>
  );
}
