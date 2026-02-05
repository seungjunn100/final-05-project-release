import { FeatureCardProps } from '@/types/home';

export default function SectionFeatureCard({ icon: Icon, iconTextColor, iconBgColor, title, description }: FeatureCardProps) {
  return (
    <div className="card flex flex-col gap-4 items-start p-6 bg-white border border-gray-200 rounded-2xl md:w-[calc(50%-12px)] lg:w-[calc((100%/3)-16px)]">
      <div className={`inline-block p-3 ${iconTextColor} ${iconBgColor} rounded-md`}>
        <Icon />
      </div>
      <h3 className="font-semibold text-yg-black text-[18px] md:text-[19px] lg:text-[20px]">{title}</h3>
      <p className="text-yg-black text-[14px] md:text-[15px] lg:text-[16px]">{description}</p>
    </div>
  );
}
