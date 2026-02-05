import SectionFeatureCard from '@/components/common/SectionFeatureCard';
import { Sparkles, Package, Calendar, Shield, Repeat } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    iconTextColor: 'text-blue-600',
    iconBgColor: 'bg-blue-100',
    title: 'AI 건강 분석',
    description: '평소 컨디션과 생활 패턴에 대한 설문을 통해 현재 건강 상태와 필요한 영양소를 정확히 파악합니다.',
  },
  {
    icon: Package,
    iconTextColor: 'text-purple-600',
    iconBgColor: 'bg-purple-100',
    title: '개인 맞춤 구성',
    description: '필요한 영양제만 담은 맞춤형 패키지로 불필요한 낭비 없이 효율적으로 건강을 관리할 수 있습니다.',
  },
  {
    icon: Repeat,
    iconBgColor: 'bg-slate-100',
    iconTextColor: 'text-slate-600',
    title: '정기 검사',
    description: '정기적인 재검사로 변화하는 컨디션에 맞춰 영양제 구성을 업데이트합니다. (재검사 시 할인 쿠폰 증정)',
  },
  {
    icon: Calendar,
    iconBgColor: 'bg-green-100',
    iconTextColor: 'text-green-600',
    title: '정기 배송',
    description: '매달 자동으로 배송되어 영양제 구매를 깜빡할 걱정이 없습니다. (언제든 변경 가능)',
  },
  {
    icon: Shield,
    iconBgColor: 'bg-orange-100',
    iconTextColor: 'text-orange-600',
    title: '품질 보증',
    description: '엄선된 프리미엄 영양제만을 제공하여 안전하고 효과적인 건강 관리를 약속합니다.',
  },
];

export default function SectionFeatures() {
  return (
    <section id="features">
      <div className="px-4 py-16 lg:py-22 xl:w-6xl xl:mx-auto xl:px-0">
        <h2 className="font-bold text-yg-black text-[22px]/[1.4] text-center md:text-2xl lg:text-3xl">
          AI가 분석하는 <br />
          나만의 맞춤 영양 솔루션
        </h2>
        <p className="mt-3 mb-9 text-yg-black text-[14px] text-center md:text-[15px] lg:mt-5 lg:mb-15 lg:text-[16px]">
          매일 변화하는 컨디션을 AI가 정밀하게 분석하여 <br />
          최적의 영양제 조합을 제안합니다.
        </p>
        <div className="cards flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center">
          {features.map((feature) => (
            <SectionFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
