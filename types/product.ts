// 카테고리
export type Category = {
  id: string;
  name: string;
};

// 영양소 (※ required로 통일)
export type NutritionNutrient = {
  name: string;
  amount: string;
  percent: string;
};

// 영양정보 박스
export type NutritionInfoExample = {
  servingSize: string;
  nutrients: NutritionNutrient[];
};

// 상품 (리스트/상세 공용)
export interface SupplementItem {
  _id: number;
  createdAt: string;
  updatedAt: string;
  mainId: string;
  categoryId: string;
  name: string;
  content: string;
  mainNutrients: string[];
  mainFunctions: string[];
  intakeGuide: string;
  precautions: string[];
  storage: string;
  nutritionInfoExample?: {
    servingSize: string;
    nutrients: {
      name: string;
      amount: string;
      dailyValue: string;
    }[];
  };
  seller_id: number; // 추가
  price: number;
  quantity: number;
  show: boolean;
  active: boolean;
  views: number;
  imageUrl?: string;
  summary?: string;
  tags?: string[];
}

// 정렬
export type SortType = 'popular' | 'priceLow' | 'priceHigh';
