export type CategoryKey = 'diet' | 'skin_hair' | 'women' | 'eye' | 'gut' | 'brain' | 'bone_joint' | 'blood_flow' | 'immune_fatigue' | 'general';

export type Intensity = 'very_low' | 'low' | 'mid' | 'high' | 'very_high';

export type AnswerMap = Record<string, unknown>;

export type QuestionType = 'basicInfo' | 'category' | 'multiChoice' | 'scaleChoice';

export type BaseQuestion = {
  id: string;
  title: string;
  required?: boolean;
  type: QuestionType;
};

export type BasicInfoQuestion = BaseQuestion & {
  type: 'basicInfo';
};

export type CategoryQuestion = BaseQuestion & {
  type: 'category';
  maxSelect: number; //초과 방지는 다음 이슈에서 진행
};

export type MultiChoiceQuestion = BaseQuestion & {
  type: 'multiChoice';
  options: { label: string; value: string }[];
};

export type ScaleChoiceQuestion = BaseQuestion & {
  type: 'scaleChoice';
  options: { label: string; value: Intensity }[];
};

export type QuestionDef = BasicInfoQuestion | CategoryQuestion | MultiChoiceQuestion | ScaleChoiceQuestion;
