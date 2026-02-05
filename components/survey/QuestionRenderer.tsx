'use client';

import BasicInfo from './questions/BasicInfo';
import Category from './questions/Category';
import MultiChoice from './questions/MultiChoice';
import ScaleChoice from './questions/ScaleChoice';
import type { QuestionData } from '@/app/survey/data/Questions';

type BasicInfoValue = {
  gender?: 'M' | 'F';
  ageGroup?: string;
};

type Props = {
  question: QuestionData;
  value: unknown;
  onChange: (next: unknown) => void;
};

export default function QuestionRenderer({ question, value, onChange }: Props) {
  switch (question.uiType) {
    /* ================= basicInfo ================= */
    case 'basicInfo': {
      const v = (value ?? {}) as BasicInfoValue;

      return <BasicInfo gender={v.gender} ageGroup={v.ageGroup} onChangeGender={(g) => onChange({ ...v, gender: g })} onChangeAgeGroup={(a) => onChange({ ...v, ageGroup: a })} />;
    }

    /* ================= categorySelect ================= */
    case 'categorySelect': {
      const v = Array.isArray(value) ? (value as string[]) : [];
      const max = typeof question.maxSelect === 'number' ? question.maxSelect : 2; // 기본 2

      return <Category categories={question.options} value={v} maxSelect={max} onChange={(next) => onChange(next)} />;
    }

    /* ================= multiChoice ================= */
    case 'multiChoice': {
      const v = Array.isArray(value) ? (value as string[]) : [];
      const max = typeof question.maxSelect === 'number' ? question.maxSelect : undefined;

      return <MultiChoice options={question.options} value={v} maxSelect={max} onChange={(next) => onChange(next)} />;
    }

    /* ================= scaleChoice ================= */
    case 'scaleChoice': {
      const v = typeof value === 'number' ? value : undefined;

      const choices = question.scaleChoices?.map((label, idx) => ({
        value: idx + 1,
        label,
      }));

      if (!choices) return null;

      return <ScaleChoice value={v} onChange={(n) => onChange(n)} choices={choices} />;
    }

    default:
      return null;
  }
}
