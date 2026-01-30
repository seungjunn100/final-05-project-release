import type { QuestionData } from './Questions';

export type CategoryKey = 'diet' | 'skin_hair' | 'women' | 'eye' | 'gut' | 'brain' | 'bone_joint' | 'blood_flow' | 'immune_fatigue' | 'general';

type CategoryQuestionPack = {
  state: {
    title: string;
    options: { id: string; label: string }[];
    maxSelect?: number;
  };
  intensity: {
    title: string;
    scaleChoices: [string, string, string, string, string];
  };
};

const CATEGORY_QUESTION_MAP: Record<CategoryKey, CategoryQuestionPack> = {
  diet: {
    state: {
      title: '최근 체중이나 체형과 관련해 어떤 점이 가장 신경 쓰이나요?(복수 선택)',
      options: [
        { id: 'diet_1', label: '체중이 늘어서 걱정돼요' },
        { id: 'diet_2', label: '체형(복부, 하체 등)이 마음에 들지 않아요' },
        { id: 'diet_3', label: '식욕이 조절이 잘 안 돼요' },
        { id: 'diet_4', label: '체중은 괜찮지만 건강 관리를 위해 관리하고 싶어요' },
        { id: 'diet_5', label: '운동을 해도 잘 빠지지 않아요' },
      ],
    },
    intensity: {
      title: '요즘 체형이나 체중 문제로 스트레스를 얼마나 받고 계세요?',
      scaleChoices: ['거의 신경 안 써요', '가끔 생각나요', '조금 신경 쓰여요', '자주 스트레스 받아요', '하루 종일 고민이에요'],
    },
  },

  skin_hair: {
    state: {
      title: '최근 피부나 모발 상태 중에 특히 불편하다고 느끼는 점이 있다면 알려주세요.(복수 선택)',
      options: [
        { id: 'skin_1', label: '피부가 건조하거나 쉽게 갈라져요' },
        { id: 'skin_2', label: '여드름/뾰루지 등 트러블이 자주 생겨요' },
        { id: 'skin_3', label: '피부가 칙칙하고 생기가 없어요' },
        { id: 'hair_1', label: '두피가 민감하거나 자주 가려워요' },
        { id: 'hair_2', label: '머리카락이 많이 빠지는 것 같아요' },
        { id: 'hair_3', label: '머릿결이 푸석하고 힘이 없어요' },
      ],
    },
    intensity: {
      title: '피부나 모발 때문에 요즘 얼마나 스트레스를 느끼고 계세요?',
      scaleChoices: ['거의 신경 쓰지 않아요', '가끔 신경 쓰여요', '조금 신경 쓰여요', '자주 스트레스 받아요', '하루종일 거울만 보게 돼요'],
    },
  },

  women: {
    state: {
      title: '최근 여성 건강과 관련해 불편함을 느끼는 부분이 있다면 알려주세요.(복수 선택)',
      options: [
        { id: 'women_1', label: '생리통이 심하거나 생리 전후 컨디션 변화가 커요' },
        { id: 'women_2', label: '생리 주기가 불규칙하거나 늦어지는 경우가 있어요' },
        { id: 'women_3', label: '생리 전 피부 트러블이나 붓기, 예민함이 심해요' },
        { id: 'women_4', label: '스트레스를 받으면 생리 증상이 더 심해져요' },
        { id: 'women_5', label: '갱년기 증상이 시작된 것 같아요 (홍조, 불면, 기분 변화 등)' },
      ],
    },
    intensity: {
      title: '여성 건강 문제로 인한 신체적·정서적 불편함이 얼마나 자주 느껴지시나요?',
      scaleChoices: ['거의 불편함이 없어요', '가끔 불편해요', '어느 정도 불편해요', '자주 신경 쓰이고 힘들어요', '생활에 지장이 있을 정도예요'],
    },
  },

  eye: {
    state: {
      title: '최근 눈의 상태와 관련해 불편하다고 느끼는 부분이 있다면 선택해주세요.(복수 선택)',
      options: [
        { id: 'eye_1', label: '눈이 자주 피로하고 무겁게 느껴져요' },
        { id: 'eye_2', label: '눈이 건조하거나 뻑뻑해요' },
        { id: 'eye_3', label: '시야가 흐릿해질 때가 종종 있어요' },
        { id: 'eye_4', label: '눈이 쉽게 충혈되거나 눈물이 나요' },
        { id: 'eye_5', label: '밝은 화면이나 조명에 민감해요' },
        { id: 'eye_6', label: '장시간 스마트폰/컴퓨터를 사용해요' },
      ],
    },
    intensity: {
      title: '눈의 피로나 불편함 때문에 생활에 영향을 받는다고 느끼시나요?',
      scaleChoices: ['전혀 불편하지 않아요', '가끔 피곤한 정도예요', '꽤 자주 피로감을 느껴요', '업무나 일상에 방해가 될 정도예요', '눈 상태 때문에 집중이 어렵고 지장이 커요'],
    },
  },

  gut: {
    state: {
      title: '최근 장이나 소화와 관련해 불편함을 느낀 부분이 있다면 선택해주세요.(복수 선택)',
      options: [
        { id: 'gut_1', label: '자주 더부룩하거나 속이 더뎌요' },
        { id: 'gut_2', label: '변비가 자주 생기거나 배변이 힘들어요' },
        { id: 'gut_3', label: '설사나 묽은 변이 잦아요' },
        { id: 'gut_4', label: '식사 후에 속이 불편하거나 더부룩해요' },
        { id: 'gut_5', label: '배에 가스가 자주 차고 불편해요' },
        { id: 'gut_6', label: '장 건강을 꾸준히 관리하고 싶어요' },
      ],
    },
    intensity: {
      title: '장이나 소화 관련 불편함 때문에 일상에서 불편함을 자주 느끼시나요?',
      scaleChoices: ['전혀 불편하지 않아요', '가끔 불편함이 느껴져요', '식사 후에 종종 속이 더부룩해요', '변비나 속 더부룩함이 일상에 자주 불편함을 줘요', '복부 불편 때문에 식사나 활동에 지장이 있어요'],
    },
  },

  brain: {
    state: {
      title: '최근 집중력이나 기억력과 관련해 느껴지는 어려움이 있다면 선택해주세요.\n(복수 선택)',
      options: [
        { id: 'brain_1', label: '멍한 상태가 자주 느껴지고 집중이 잘 안 돼요' },
        { id: 'brain_2', label: '해야 할 일이 있는데 자꾸 미루게 돼요' },
        { id: 'brain_3', label: '기억력이 예전보다 떨어진 느낌이 있어요' },
        { id: 'brain_4', label: '일이나 공부할 때 금방 지치고 산만해져요' },
        { id: 'brain_5', label: '생각이 잘 정리되지 않고 말이 잘 안 나올 때가 있어요' },
      ],
    },
    intensity: {
      title: '집중력이나 기억력 저하로 인해 일상에서 불편함을 자주 느끼시나요?',
      scaleChoices: ['전혀 불편하지 않아요', '가끔 흐릿한 느낌이 들지만 큰 문제는 없어요', '피곤하거나 스트레스를 받을 때 집중이 어려워요', '일상 업무나 학습에 방해가 될 때가 많아요', '집중력 저하 때문에 생활 리듬이 무너진다고 느껴져요'],
    },
  },

  bone_joint: {
    state: {
      title: '뼈나 관절 관련해서 최근에 불편함을 느끼는 부분이 있다면 선택해주세요.(복수 선택)',
      options: [
        { id: 'bone_1', label: '무릎, 허리, 손목 등 관절이 자주 뻣뻣하거나 욱신거려요' },
        { id: 'bone_2', label: '날씨나 움직임에 따라 관절 통증이 심해질 때가 있어요' },
        { id: 'bone_3', label: '관절이 자주 ‘딱딱’ 소리가 나거나 움직이기 불편해요' },
        { id: 'bone_4', label: '자세를 오래 유지하면 뻐근함이 심해요' },
        { id: 'bone_5', label: '골다공증이나 뼈 건강이 걱정돼요' },
      ],
    },
    intensity: {
      title: '뼈나 관절 관련 문제 때문에 일상생활에서 불편함을 얼마나 자주 느끼시나요?',
      scaleChoices: ['평소엔 불편함을 거의 못 느껴요', '가끔 뻐근하거나 시린 느낌이 있어요', '자주 느끼지만 참고 지낼 수 있어요', '생활 중에 불편해서 자주 신경 쓰여요', '통증이나 불편감이 심해 일상에 지장이 있어요'],
    },
  },

  blood_flow: {
    state: {
      title: '혈액순환이나 심혈관 건강과 관련해 최근에 느끼는 불편함이 있다면 선택해주세요.\n(복수 선택)',
      options: [
        { id: 'blood_1', label: '손발이 자주 차갑고 저리거나 감각이 둔해요' },
        { id: 'blood_2', label: '앉았다 일어날 때 어지러운 경우가 있어요' },
        { id: 'blood_3', label: '계단을 오르거나 움직일 때 쉽게 숨이 차요' },
        { id: 'blood_4', label: '가슴이 두근거리거나 불규칙하게 뛰는 느낌이 있어요' },
        { id: 'blood_5', label: '혈압이나 콜레스테롤 수치가 걱정돼요' },
      ],
    },
    intensity: {
      title: '혈액순환이나 심혈관 관련 문제로 인해 불편함을 느끼는 일이 얼마나 자주 있나요?',
      scaleChoices: ['특별히 불편함은 없어요', '가끔 손발이 차거나 어지러운 정도예요', '자주 느끼지만 일상생활에는 큰 지장이 없어요', '운동이나 활동에 제한을 느낄 때가 많아요', '건강에 대한 걱정이 커서 관리가 꼭 필요하다고 느껴요'],
    },
  },

  immune_fatigue: {
    state: {
      title: '최근 피로감이나 면역력 저하와 관련해 불편하다고 느끼는 부분이 있다면 선택해주세요.(복수 선택)',
      options: [
        { id: 'imm_1', label: '자고 일어나도 피곤함이 잘 안 풀려요' },
        { id: 'imm_2', label: '오후나 저녁쯤 되면 쉽게 지쳐요' },
        { id: 'imm_3', label: '계절이 바뀔 때마다 감기나 몸살에 자주 걸려요' },
        { id: 'imm_4', label: '스트레스를 받으면 몸이 바로 안 좋아져요' },
        { id: 'imm_5', label: '특별히 무리는 안 했는데 항상 피곤한 느낌이에요' },
        { id: 'imm_6', label: '컨디션을 전반적으로 끌어올리고 싶어요' },
      ],
    },
    intensity: {
      title: '요즘 피로나 잦은 몸살, 면역 저하로 인한 불편함이 얼마나 자주 느껴지시나요?',
      scaleChoices: ['거의 문제없이 지내고 있어요', '피곤할 때는 있지만 금방 회복돼요', '자주 피곤하거나 예민해지는 편이에요', '평소 활동에도 지장이 있을 만큼 피로해요', '건강에 대한 걱정이 클 정도로 자주 아프고 지쳐요'],
    },
  },

  general: {
    state: {
      title: '특별한 증상은 없지만, 어떤 이유로 건강 관리를 시작하고 싶으신가요?(복수 선택)',
      options: [
        { id: 'gen_1', label: '식사나 수면 습관이 불규칙해서 걱정돼요' },
        { id: 'gen_2', label: '최근 피로가 쌓이긴 했지만 병원 갈 정도는 아니에요' },
        { id: 'gen_3', label: '나이가 들면서 체력 유지가 걱정돼요' },
        { id: 'gen_4', label: '평소에 건강 관리를 잘 못 해서 시작해보려 해요' },
        { id: 'gen_5', label: '하루 컨디션을 안정적으로 유지하고 싶어요' },
        { id: 'gen_6', label: '특별한 이유는 없지만 기본 영양 관리를 하고 싶어요' },
      ],
    },
    intensity: {
      title: '건강 관리를 시작해야겠다고 느끼는 정도는 어느 정도인가요?',
      scaleChoices: ['아직 크게 필요성을 못 느끼고 있어요', '챙기면 좋겠지만 급한 건 아니에요', '요즘 들어 점점 필요성을 느끼고 있어요', '하루라도 빨리 건강 습관을 들여야겠다고 느껴요', '건강 관리가 시급하다고 느껴질 정도예요'],
    },
  },
};

export function buildQuestions(selectedCategories?: CategoryKey[]): QuestionData[] {
  // 시작 질문 2개
  const base: QuestionData[] = [
    {
      id: 'basic',
      uiType: 'basicInfo',
      title: '기본 정보를 알려주세요',
      description: '성별과 연령대를 선택해 주세요.',
    },
    {
      id: 'category',
      uiType: 'categorySelect',
      title: '최근에 특히 신경 쓰이는 부분이 있다면 골라주세요(최대 2개)',
      description: '최소 1개 이상 선택해 주세요.',
      options: [
        { id: 'diet', label: '다이어트' },
        { id: 'skin_hair', label: '피부·모발' },
        { id: 'women', label: '여성 건강' },
        { id: 'eye', label: '눈 건강' },
        { id: 'gut', label: '장 건강' },
        { id: 'brain', label: '뇌·집중력' },
        { id: 'bone_joint', label: '뼈·관절' },
        { id: 'blood_flow', label: '혈액순환' },
        { id: 'immune_fatigue', label: '면역·피로' },
        { id: 'general', label: '종합 건강' },
      ],
      maxSelect: 2,
    },
  ];

  const cats = selectedCategories ?? [];
  if (cats.length === 0) return base;

  // 선택 카테고리 (상태1 + 강도1)
  const perCategory: QuestionData[] = cats.flatMap((key) => {
    const pack = CATEGORY_QUESTION_MAP[key];

    return [
      {
        id: `${key}_state`,
        uiType: 'multiChoice',
        title: pack.state.title,
        options: pack.state.options,
        maxSelect: pack.state.maxSelect,
      },
      {
        id: `${key}_intensity`,
        uiType: 'scaleChoice',
        title: pack.intensity.title,
        scaleChoices: pack.intensity.scaleChoices,
      },
    ];
  });

  //  공통 보조 질문 2개
  const common: QuestionData[] = [
    {
      id: 'life_rhythm',
      uiType: 'scaleChoice',
      title: '평소 생활 리듬은 얼마나 규칙적인 편인가요?',
      scaleChoices: ['거의 매일 규칙적으로 식사하고 자고 활동해요', '대부분 일정하지만 가끔 흐트러질 때가 있어요', '조금 불규칙한 편이에요', '자고 먹는 시간이 자주 들쭉날쭉해요', '생활 리듬이 매우 불규칙하고 일정한 루틴이 없어요'],
    },
    {
      id: 'recovery_feel',
      uiType: 'scaleChoice',
      title: '휴식을 취했을 때 컨디션이 회복된다고 느끼시나요?',
      scaleChoices: ['푹 쉬면 금방 회복돼요', '일정 시간 쉬면 어느 정도 괜찮아져요', '회복되는 느낌이 크진 않지만 조금 나아져요', '쉬어도 피로감이나 불편함이 잘 안 풀려요', '아무리 쉬어도 컨디션이 전혀 회복되지 않는 것 같아요'],
    },
  ];

  return [...base, ...perCategory, ...common];
}
