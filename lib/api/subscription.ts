'use server';
import { cookies } from 'next/headers';

interface SubscriptionProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity?: number; // 추가
}

interface SubscriptionItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  status: 'active' | 'paused';
  startDate: string;
  nextPaymentDate: string;
}

interface ApiResponse<T = undefined> {
  ok: number;
  item?: T;
  message?: string;
}

// 백엔드 주문 API 응답 타입
interface OrderProduct {
  _id: number;
  quantity: number;
  seller_id: number;
  name: string;
  size?: string;
  color?: string;
  image?: {
    url: string;
    name: string;
  };
  price: number;
  extra?: Record<string, unknown>;
}

interface Order {
  _id: number;
  products: OrderProduct[];
  state: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  cost: {
    products: number;
    shippingFees: number;
    discount: {
      products: number;
      shippingFees: number;
    };
    total: number;
  };
}

// 테스트용: globalThis를 사용한 영구 저장소 (서버 재시작 전까지 유지)
declare global {
  var mockSubscriptionsStore: SubscriptionItem[] | undefined;
}

// 전역 저장소 초기화
if (!global.mockSubscriptionsStore) {
  global.mockSubscriptionsStore = [];
}

/**
 * 백엔드 주문 데이터를 프론트엔드 구독 데이터로 변환
 */
function transformOrderToSubscription(order: Order): SubscriptionItem[] {
  const subscriptionId = order._id.toString();
  const startDate = order.createdAt || new Date().toISOString().split('T')[0];
  const nextPaymentDate = calculateNextPaymentDate(startDate);

  return order.products.map((product: OrderProduct) => ({
    _id: subscriptionId,
    productId: product._id.toString(),
    name: product.name,
    price: product.price,
    imageUrl: product.image?.url,
    status: (order.state || 'active') as 'active' | 'paused',
    startDate: startDate,
    nextPaymentDate: nextPaymentDate,
  }));
}

/**
 * 다음 결제일 계산 (시작일로부터 1개월 후)
 */
function calculateNextPaymentDate(startDate: string): string {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
}

/**
 * 사용자의 구독 목록 조회
 */
export async function getSubscriptions(): Promise<ApiResponse<SubscriptionItem[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    console.log('🔍 getSubscriptions 호출');
    console.log('🔍 token:', token ? '있음' : '없음');
    console.log('📦 현재 저장된 구독 개수:', global.mockSubscriptionsStore?.length || 0);
    console.log('📦 구독 목록:', global.mockSubscriptionsStore);

    // 테스트용: 전역 저장소에서 반환
    return {
      ok: 1,
      item: global.mockSubscriptionsStore || [],
    };
  } catch (error) {
    console.error('구독 목록 조회 오류:', error);
    return { ok: 0, message: '서버 오류가 발생했습니다.' };
  }
}

/**
 * 구독 상태 업데이트 (활성/일시정지)
 */
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: 'active' | 'paused'
): Promise<ApiResponse<SubscriptionItem>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    console.log('🔍 updateSubscriptionStatus 호출');
    console.log('🔍 subscriptionId:', subscriptionId);
    console.log('🔍 new status:', status);

    // 테스트용: 전역 저장소에서 업데이트
    const subscriptions = global.mockSubscriptionsStore || [];
    const index = subscriptions.findIndex(sub => sub._id === subscriptionId);
    
    if (index !== -1) {
      subscriptions[index].status = status;
      global.mockSubscriptionsStore = subscriptions;
      
      console.log('✅ 구독 상태 업데이트 성공');
      
      return {
        ok: 1,
        item: subscriptions[index],
        message: '구독 상태가 업데이트되었습니다.',
      };
    }

    return { ok: 0, message: '구독을 찾을 수 없습니다.' };
  } catch (error) {
    console.error('구독 상태 업데이트 오류:', error);
    return { ok: 0, message: '서버 오류가 발생했습니다.' };
  }
}

/**
 * 새로운 구독 추가
 */
export async function addSubscription(products: SubscriptionProduct[]): Promise<ApiResponse<SubscriptionItem[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    console.log('🔍 addSubscription 호출');
    console.log('🔍 추가할 products:', products);

    // 테스트용: 전역 저장소에 추가
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // 기존 구독 확인
    if (!global.mockSubscriptionsStore) {
      global.mockSubscriptionsStore = [];
    }

    console.log('📦 현재 저장된 구독:', global.mockSubscriptionsStore);
    console.log('📦 저장된 구독 개수:', global.mockSubscriptionsStore.length);

    const existingProductIds = new Set(
      global.mockSubscriptionsStore.map(sub => sub.productId)
    );
    
    console.log('🔍 기존 productId 목록:', Array.from(existingProductIds));
    console.log('🔍 새로 추가할 productId 목록:', products.map(p => p.productId));

    // 중복되지 않는 상품만 필터링
    const newProducts = products.filter(
      product => !existingProductIds.has(product.productId)
    );

    console.log('✅ 실제로 추가될 상품:', newProducts);

    if (newProducts.length === 0) {
      console.log('⚠️ 모든 상품이 이미 구독 중입니다');
      return {
        ok: 1,
        item: [],
        message: '이미 구독 중인 상품입니다.',
      };
    }

    const newSubscriptions: SubscriptionItem[] = newProducts.map((product, index) => ({
      _id: `sub-${Date.now()}-${index}`,
      productId: product.productId,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      status: 'active' as const,
      startDate: today.toISOString().split('T')[0],
      nextPaymentDate: nextMonth.toISOString().split('T')[0],
    }));

    global.mockSubscriptionsStore.push(...newSubscriptions);

    console.log('✅ 구독 추가 성공:', newSubscriptions);
    console.log('📦 추가 후 전체 구독 목록:', global.mockSubscriptionsStore);

    if (newProducts.length < products.length) {
      const skippedCount = products.length - newProducts.length;
      return {
        ok: 1,
        item: newSubscriptions,
        message: `${newSubscriptions.length}개 구독 추가 완료 (${skippedCount}개는 이미 구독 중)`,
      };
    }

    return {
      ok: 1,
      item: newSubscriptions,
      message: '구독이 추가되었습니다.',
    };
  } catch (error) {
    console.error('구독 추가 오류:', error);
    return { ok: 0, message: '서버 오류가 발생했습니다.' };
  }
}

/**
 * 구독 삭제 (취소)
 */
export async function deleteSubscription(subscriptionId: string): Promise<ApiResponse<undefined>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    console.log('🔍 deleteSubscription 호출');
    console.log('🔍 subscriptionId:', subscriptionId);

    // 테스트용: 전역 저장소에서 삭제
    const subscriptions = global.mockSubscriptionsStore || [];
    const index = subscriptions.findIndex(sub => sub._id === subscriptionId);
    
    if (index !== -1) {
      subscriptions.splice(index, 1);
      global.mockSubscriptionsStore = subscriptions;
      
      console.log('✅ 구독 삭제 성공');
      
      return {
        ok: 1,
        message: '구독이 취소되었습니다.',
      };
    }

    return { ok: 0, message: '구독을 찾을 수 없습니다.' };
  } catch (error) {
    console.error('구독 삭제 오류:', error);
    return { ok: 0, message: '서버 오류가 발생했습니다.' };
  }
}

/**
 * 테스트용: 모든 구독 초기화
 * 개발/테스트 환경에서만 사용하세요!
 */
export async function clearAllSubscriptions(): Promise<ApiResponse<undefined>> {
  try {
    console.log('🗑️ 모든 구독 초기화 시작');
    console.log('📦 초기화 전 구독 개수:', global.mockSubscriptionsStore?.length || 0);
    console.log('📦 초기화 전 구독 목록:', global.mockSubscriptionsStore);
    
    global.mockSubscriptionsStore = [];
    
    console.log('📦 초기화 후 구독 개수:', global.mockSubscriptionsStore.length);
    console.log('✅ 초기화 완료');

    return {
      ok: 1,
      message: '모든 구독이 초기화되었습니다.',
    };
  } catch (error) {
    console.error('구독 초기화 오류:', error);
    return { ok: 0, message: '초기화 중 오류가 발생했습니다.' };
  }
}