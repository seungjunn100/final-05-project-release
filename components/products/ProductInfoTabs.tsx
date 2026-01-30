type TabKey = 'features' | 'nutrition' | 'intake' | 'cautions';

type ProductInfoTabsProps = {
  active: TabKey;
  onChange: (key: TabKey) => void;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'features', label: '주요 기능' },
  { key: 'nutrition', label: '영양 정보' },
  { key: 'intake', label: '섭취 방법' },
  { key: 'cautions', label: '주의사항' },
];

export default function ProductInfoTabs({ active, onChange }: ProductInfoTabsProps) {
  return (
    <nav aria-label="상품 상세 탭" className="rounded-lg bg-yg-white px-6 pt-4 shadow">
      <div className="flex gap-6 border-b border-yg-lightgray">
        {TABS.map((tab) => {
          const isActive = tab.key === active;

          return (
            <button key={tab.key} type="button" onClick={() => onChange(tab.key)} className={['relative pb-3 text-sm font-semibold transition', isActive ? 'text-yg-primary' : 'text-yg-gray hover:text-yg-darkgray'].join(' ')}>
              {tab.label}
              {isActive && <span className="absolute left-0 right-0 -bottom-[1px] h-[3px] rounded-full bg-yg-primary" />}
            </button>
          );
        })}
      </div>
      <div className="h-3" />
    </nav>
  );
}
