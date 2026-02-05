// types/subscription.ts

export interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export interface ApiProduct {
  _id: string;
  price: number;
  name: string;
  categoryId: string;
  mainNutrients?: string[];
  mainFunctions?: string[];
}

export interface SubscriptionProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  imageUrl?: string;
}

export interface OrdererInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
}

export type PaymentMethod = 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | '';