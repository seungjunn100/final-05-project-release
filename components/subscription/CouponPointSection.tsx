import SectionCard from './SectionCard';

interface CouponPointSectionProps {
  coupon: string;
  point: string;
  availablePoints: number;
  onCouponChange: (value: string) => void;
  onPointChange: (value: string) => void;
  onApplyCoupon: () => void;
  onUseAllPoints: () => void;
}

export default function CouponPointSection({
  coupon,
  point,
  availablePoints,
  onCouponChange,
  onPointChange,
  onApplyCoupon,
  onUseAllPoints,
}: CouponPointSectionProps) {
  return (
    <SectionCard title="쿠폰/포인트">
      <div className="flex flex-col gap-6">
        {/* 쿠폰 */}
        <div className="flex justify-between items-end gap-6">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="coupon" className='font-semibold text-yg-primary'>쿠폰</label>
            <input
              id="coupon"
              className="coupon px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
              value={coupon}
              onChange={(e) => onCouponChange(e.target.value)}
              placeholder="쿠폰 코드 입력"
            />
          </div>
          <button
            className="bg-yg-primary px-2 w-27 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg"
            onClick={onApplyCoupon}
          >
            쿠폰 적용
          </button>
        </div>

        {/* 포인트 */}
        <div className="flex justify-between items-end gap-6">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="point" className='font-semibold text-yg-primary'>포인트 (보유: {availablePoints.toLocaleString()}P)</label>
            <input
              id="point"
              type="number"
              min={0}
              className="point px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
              value={point}
              onChange={(e) => onPointChange(e.target.value)}
              placeholder="포인트 입력"
            />
          </div>
          <button
            className="bg-yg-primary px-2 w-27 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg"
            onClick={onUseAllPoints}
          >
            전액 사용
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
