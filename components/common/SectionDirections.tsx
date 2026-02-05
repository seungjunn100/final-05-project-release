import SectionDirectionList from '@/components/common/SectionDirectionList';
import Image from 'next/image';

const directions = [
  {
    title: '3분 컨디션 설문',
    description: '간단한 질문으로 컨디션 상태 파악',
  },
  {
    title: '맞춤형 추천',
    description: 'AI가 정밀하게 분석한 최적의 조합',
  },
  {
    title: '정기적인 검사',
    description: '컨디션 상태 변화에 따라 구성을 업데이트',
  },
  {
    title: '할인 혜택',
    description: '신규 회원, 재검사 시 할인 쿠폰 제공',
  },
];

const categoryImages = [
  {
    span: 'col-span-2 row-span-2',
    src: '/images/category/eye_health.png',
    alt: '눈 건강 영양제',
  },
  {
    span: '',
    src: '/images/category/immune_energy.png',
    alt: '면역•피로 영양제',
  },
  {
    span: '',
    src: '/images/category/circulation.png',
    alt: '혈액 순환 영양제',
  },
  {
    span: '',
    src: '/images/category/womens_health.png',
    alt: '여성 건강 영양제',
  },
  {
    span: '',
    src: '/images/category/skin_hair.png',
    alt: '피부•모발 영양제',
  },
  {
    span: '',
    src: '/images/category/gut_health.png',
    alt: '장 건강 영양제',
  },
  {
    span: '',
    src: '/images/category/general.png',
    alt: '종합 건강 영양제',
  },
  {
    span: 'col-span-2 row-span-2',
    src: '/images/category/diet.png',
    alt: '다이어트 영양제',
  },
  {
    span: '',
    src: '/images/category/brain_focus.png',
    alt: '뇌•집중력 영양제',
  },
  {
    span: '',
    src: '/images/category/bone_joint.png',
    alt: '뼈•관절 영양제',
  },
];

export default function SectionDirections() {
  return (
    <section id="directions">
      <div className="px-4 py-16 md:flex md:items-center md:gap-8 lg:py-22 lg:gap-18 xl:w-6xl xl:mx-auto xl:px-0">
        <div className="flex flex-col items-center md:items-baseline md:basis-[calc(50%-16px)] md:order-1 lg:basis-[calc(50%-36px)]">
          <h2 className="font-bold text-yg-black text-[22px]/[1.4] text-center md:text-2xl md:text-left lg:text-3xl">
            복잡한 영양제 선택, <br />
            이제는 간단하게 맞춤형으로!
          </h2>
          <p className="mt-3 mb-9 text-yg-black text-[14px] text-center md:text-[15px] md:text-left lg:mt-5 lg:mb-15 lg:text-[16px]">
            고민되는 영양제 선택, 설문 한 번으로 끝내세요. <br />
            AI가 분석한 내 몸 맞춤 영양제를 정기 배송으로 편리하게 받아보세요.
          </p>
          <div className="flex flex-col gap-4">
            {directions.map((direction) => (
              <SectionDirectionList key={direction.title} {...direction} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-9 md:basis-[calc(50%-16px)] md:mt-0 lg:basis-[calc(50%-36px)]">
          {categoryImages.map((category) => (
            <div key={category.alt} className={`${category.span} aspect-square`}>
              <Image width={200} height={200} src={category.src} alt={category.alt} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
