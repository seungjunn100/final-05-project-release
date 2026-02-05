export interface UserInfo {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
}

export interface SubscriptionInfo {
  isSubscribed: boolean;
  productName: string;
  dosage: string;
  paymentDate: string;
  nextPaymentDate: string;
}

export type TabType = 'info' | 'subscription' | 'survey';