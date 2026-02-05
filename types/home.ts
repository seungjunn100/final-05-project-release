import { LucideIcon } from 'lucide-react';

// 서비스 특징 카드 Props
export interface FeatureCardProps {
  icon: LucideIcon;
  iconTextColor: string;
  iconBgColor: string;
  title: string;
  description: string;
}

// 사용 설명 리스트 Props
export interface DirectionListProps {
  title: string;
  description: string;
}
