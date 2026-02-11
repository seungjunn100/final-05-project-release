'use server';
import { cookies } from 'next/headers';

interface SubscriptionProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity?: number;
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

// posts API 응답 타입
interface Post {
  _id: number;
  type: string;
  title: string;
  content: string;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 다음 결제일 계산 (시작일로부터 1개월 후)
 */
function calculateNextPaymentDate(startDate: string): string {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
}

/**
 * posts 데이터를 구독 데이터로 변환
 */
function transformPostToSubscription(post: Post): SubscriptionItem {
  const contentData = JSON.parse(post.content);
  const startDate = contentData.startDate || post.createdAt.split(' ')[0];
  
  return {
    _id: post._id.toString(),
    productId: contentData.productId,
    name: contentData.name,
    price: contentData.price,
    imageUrl: contentData.imageUrl,
    status: contentData.status || 'active',
    startDate: startDate,
    nextPaymentDate: calculateNextPaymentDate(startDate),
  };
}

/**
 * 사용자의 구독 목록 조회
 */
export async function getSubscriptions(): Promise<ApiResponse<SubscriptionItem[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return { ok: 0, message: '로그인이 필요합니다.' };
    }

    const response = await fetch(`${API_URL}/posts/users?type=subscription`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: 0, message: errorData.message || '구독 목록 조회 실패' };
    }

    const data = await response.json();
    
    // posts를 구독 형식으로 변환
    const subscriptions: SubscriptionItem[] = [];
    if (data.item && Array.isArray(data.item)) {
      data.item.forEach((post: Post) => {
        try {
          const subscription = transformPostToSubscription(post);
          subscriptions.push(subscription);
        } catch (error) {
          console.error('게시글 변환 오류:', error);
        }
      });
    }

    console.log('✅ 구독 목록 조회 완료:', subscriptions.length, '개');

    return {
      ok: 1,
      item: subscriptions,
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

    if (!token) {
      return { ok: 0, message: '로그인이 필요합니다.' };
    }

    // 기존 게시글 조회
    const getResponse = await fetch(`${API_URL}/posts/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!getResponse.ok) {
      return { ok: 0, message: '구독을 찾을 수 없습니다.' };
    }

    const getData = await getResponse.json();
    const contentData = JSON.parse(getData.item.content);
    
    // 상태 업데이트
    contentData.status = status;

    const response = await fetch(`${API_URL}/posts/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        content: JSON.stringify(contentData),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: 0, message: errorData.message || '구독 상태 업데이트 실패' };
    }

    const data = await response.json();
    const subscription = transformPostToSubscription(data.item);

    console.log('✅ 구독 상태 업데이트 완료');

    return {
      ok: 1,
      item: subscription,
      message: '구독 상태가 업데이트되었습니다.',
    };
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

    if (!token) {
      return { ok: 0, message: '로그인이 필요합니다.' };
    }

    console.log('🔍 addSubscription 호출');
    console.log('🔍 추가할 products:', products);

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];

    const newSubscriptions: SubscriptionItem[] = [];

    // 각 상품을 개별 게시글로 생성
    for (const product of products) {
      const contentData = {
        productId: product.productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity || 1,
        status: 'active',
        startDate: startDate,
      };

      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'subscription',
          title: `${product.name} 구독`,
          content: JSON.stringify(contentData),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ 구독 추가 실패:', errorData.message);
        continue;
      }

      const data = await response.json();
      const subscription = transformPostToSubscription(data.item);
      newSubscriptions.push(subscription);
    }

    console.log('✅ 구독 추가 완료:', newSubscriptions.length, '개');

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

    if (!token) {
      return { ok: 0, message: '로그인이 필요합니다.' };
    }

    const response = await fetch(`${API_URL}/posts/${subscriptionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'client-id': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: 0, message: errorData.message || '구독 삭제 실패' };
    }

    console.log('✅ 구독 삭제 완료');

    return {
      ok: 1,
      message: '구독이 취소되었습니다.',
    };
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
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return { ok: 0, message: '로그인이 필요합니다.' };
    }

    // 모든 구독 게시글 조회
    const subscriptions = await getSubscriptions();
    
    if (subscriptions.ok !== 1 || !subscriptions.item) {
      return { ok: 0, message: '구독 목록을 가져올 수 없습니다.' };
    }

    console.log('🗑️ 모든 구독 초기화 시작');
    console.log('📦 초기화할 구독 개수:', subscriptions.item.length);

    // 각 구독 삭제
    for (const subscription of subscriptions.item) {
      await deleteSubscription(subscription._id);
    }

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