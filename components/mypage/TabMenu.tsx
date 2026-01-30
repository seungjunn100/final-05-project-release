type TabType = 'info' | 'subscription' | 'survey';

interface Tab {
  id: TabType;
  label: string;
}

interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs?: Tab[];
}

const defaultTabs: Tab[] = [
  { id: 'info', label: '사용자 정보' },
  { id: 'subscription', label: '구독 상태' },
  { id: 'survey', label: '설문 정보' },
];

export default function TabMenu({ activeTab, onTabChange, tabs = defaultTabs }: TabMenuProps) {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 rounded-[50px] font-semibold shadow-lg transition ${
            activeTab === tab.id
              ? 'bg-yg-primary text-yg-white'
              : 'bg-yg-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
