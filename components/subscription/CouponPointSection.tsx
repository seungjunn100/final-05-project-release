import SectionCard from './SectionCard';
import Button from '@/components/common/Button';

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
          <Button
            onClick={onApplyCoupon}
            disabled={!coupon.trim()}
            variant="primary"
            className="w-27 shrink-0"
          >
            쿠폰 적용
          </Button>
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
          <Button
            onClick={onUseAllPoints}
            variant="primary"
            className="w-27 shrink-0"
          >
            전액 사용
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}