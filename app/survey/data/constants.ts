import type { CategoryKey, Intensity } from '../../../types/survey';

export const CATEGORY_LIST: { label: string; key: CategoryKey }[] = [
  { label: '다이어트', key: 'diet' },
  { label: '피부·모발', key: 'skin_hair' },
  { label: '여성 건강', key: 'women' },
  { label: '눈 건강', key: 'eye' },
  { label: '장 건강', key: 'gut' },
  { label: '뇌·집중력', key: 'brain' },
  { label: '뼈·관절', key: 'bone_joint' },
  { label: '혈액순환', key: 'blood_flow' },
  { label: '면역·피로', key: 'immune_fatigue' },
  { label: '종합 건강', key: 'general' },
];

export const INTENSITY_OPTIONS: { label: string; value: Intensity }[] = [
  { label: '매우 낮음', value: 'very_low' },
  { label: '낮음', value: 'low' },
  { label: '보통', value: 'mid' },
  { label: '높음', value: 'high' },
  { label: '매우 높음', value: 'very_high' },
];
