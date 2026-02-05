export const productDetailMock = {
  _id: '1',
  name: '루테인 플러스',
  summary: '눈 건강에 도움을 줄 수 있는 건강기능식품',
  price: 29800,
  categoryId: 'eye',
  imageUrl: '/images/sample.png',
  tags: ['눈건강', '루테인'],

  mainNutrients: ['루테인', '지아잔틴'],
  mainFunctions: ['눈 피로 개선', '황반 건강 유지'],

  nutritionInfoExample: {
    servingSize: '1캡슐 (500mg)',
    nutrients: [
      { name: '루테인', amount: '20mg', percent: '100%' },
      { name: '지아잔틴', amount: '4mg', percent: '80%' },
    ],
  },

  intakeGuide: '1일 1회, 1캡슐을 물과 함께 섭취하세요.',
  precautions: ['임산부는 섭취 전 전문가와 상담하세요.'],

  // ✅ 이거 추가
  storage: '서늘하고 건조한 곳',
};
