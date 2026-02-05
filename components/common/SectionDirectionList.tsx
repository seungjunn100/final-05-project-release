import { DirectionListProps } from '@/types/home';
import { Check } from 'lucide-react';

export default function SectionDirectionList({ title, description }: DirectionListProps) {
  return (
    <div className="flex flex-wrap items-center gap-y-1">
      <div className="inline-block p-1 text-yg-primary bg-[rgba(74,197,178,0.3)] rounded-md">
        <Check width={20} height={20} />
      </div>
      <h3 className="pl-3 font-semibold text-yg-black text-[18px] md:text-[19px] lg:text-[20px]">{title}</h3>
      <p className="w-full pl-10 text-yg-black text-[14px] md:text-[15px] lg:text-[16px]">{description}</p>
    </div>
  );
}
