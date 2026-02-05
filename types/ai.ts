//요청
export type AiRecommendRequest = {
  payload: {
    selectedCategoryIds: string[];
    ageGroup?: string;
    gender?: string;
    intensityByCategoryId?: Record<string, number>;
  };
  candidates: Array<{
    id: string;
    name: string;
    categoryId?: string;
    mainFunctions?: string[];
    mainNutrients?: string[];
  }>;
  pickCount: number; // 2 or 3
};

//결과
export type AiRecommendResponse = {
  summary: string;
  ranked: Array<{
    id: string;
    score: number;
    reason: string;
  }>;
  top3: string[];
};
