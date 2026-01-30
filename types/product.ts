// types/product.ts

export type Category = {
  id: string;
  name: string;
};

export type NutritionNutrient = {
  name: string;
  amount?: string;
  percent?: string;
};

export type NutritionInfoExample = {
  servingSize: string;
  nutrients: NutritionNutrient[];
};

export type SupplementItem = {
  _id: string;
  price: number;
  name: string;
  categoryId: string;
  mainNutrients: string[];
  mainFunctions: string[];
  intakeGuide: string;
  precautions: string[];
  storage: string;
  nutritionInfoExample?: NutritionInfoExample;
};

export type SortType = 'popular' | 'priceLow' | 'priceHigh';
