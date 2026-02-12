export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SubscriptionProduct {
  _id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  status: 'active' | 'paused';
  nextPaymentDate: string;
  startDate: string;
}

export interface SubscriptionInfo {
  isSubscribed: boolean;
  products: SubscriptionProduct[];
}

export type TabType = 'info' | 'subscription' | 'survey';