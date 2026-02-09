'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TabCard from './TabCard';
import type { SubscriptionInfo } from '@/types/mypage';
import { getSubscriptions, updateSubscriptionStatus, clearAllSubscriptions } from '@/lib/api/subscription';
import Image from 'next/image';

interface SubscriptionTabProps {
  onNavigateToSubscription: () => void;
}

export default function SubscriptionTab({ onNavigateToSubscription }: SubscriptionTabProps) {
  const searchParams = useSearchParams();
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    isSubscribed: false,
    products: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  // 구독 정보 불러오기 함수
  const loadSubscriptions = async () => {
    setIsLoading(true);
    const result = await getSubscriptions();

    if (result.ok === 1 && result.item) {
      setSubscriptionInfo({
        isSubscribed: result.item.length > 0,
        products: result.item,
      });
    }
    setIsLoading(false);
  };

  // 초기 로드 및 refresh 파라미터 감지
  useEffect(() => {
    let mounted = true;

    async function fetchSubscriptions() {
      await loadSubscriptions();
    }

    if (mounted) {
      fetchSubscriptions();
    }

    return () => {
      mounted = false;
    };
  }, [searchParams]);

  // 구독 상태 변경
  const handleToggleStatus = async (subscriptionId: string, currentStatus: 'active' | 'paused') => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    setUpdatingProductId(subscriptionId);

    const result = await updateSubscriptionStatus(subscriptionId, newStatus);

    if (result.ok === 1) {
      setSubscriptionInfo((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p._id === subscriptionId ? { ...p, status: newStatus } : p
        ),
      }));
      alert(
        `구독이 ${newStatus === 'active' ? '재개' : '일시정지'}되었습니다.`
      );
    } else {
      alert(result.message || '구독 상태를 변경하지 못했습니다.');
    }

    setUpdatingProductId(null);
  };

  // 테스트용: 모든 구독 초기화
  const handleClearAll = async () => {
    if (!confirm('⚠️ 모든 구독을 초기화하시겠습니까?\n(테스트용 기능입니다)')) {
      return;
    }

    setIsClearing(true);
    const result = await clearAllSubscriptions();

    if (result.ok === 1) {
      setSubscriptionInfo({
        isSubscribed: false,
        products: [],
      });
      alert('모든 구독이 초기화되었습니다.');
    } else {
      alert(result.message || '초기화에 실패했습니다.');
    }

    setIsClearing(false);
  };

  if (isLoading) {
    return (
      <TabCard>
        <h1 className="text-lg font-semibold mb-6">구독 상태</h1>
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yg-primary mb-4"></div>
          <p className="text-yg-darkgray">구독 정보를 불러오는 중...</p>
        </div>
      </TabCard>
    );
  }

  return (
    <TabCard>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">구독 상태</h1>
        
        {/* 테스트용 초기화 버튼 */}
        {subscriptionInfo.isSubscribed && (
          <button
            onClick={handleClearAll}
            disabled={isClearing}
            className="text-sm text-yg-darkgray hover:text-red-500 transition disabled:opacity-50"
          >
            {isClearing ? '초기화 중...' : '🗑️ 전체 초기화'}
          </button>
        )}
      </div>

      {subscriptionInfo.isSubscribed ? (
        <div className="space-y-4">
          {subscriptionInfo.products.map((product) => (
            <div
              key={product._id}
              className="border border-yg-primary rounded-[30px] p-6"
            >
              {/* 상품 정보 */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-yg-white">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">💊</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'active'
                          ? 'bg-yg-primary text-yg-white'
                          : 'bg-yg-gray text-yg-white'
                      }`}
                    >
                      {product.status === 'active' ? '활성' : '일시정지'}
                    </span>
                  </div>
                  <p className="text-yg-darkgray text-sm">
                    월 {product.price.toLocaleString()}원
                  </p>
                </div>
              </div>

              {/* 결제 정보 */}
              <div className="bg-yg-white rounded-[20px] p-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-yg-darkgray">구독 시작일</span>
                  <span className="font-semibold">{product.startDate}</span>
                </div>
                {product.status === 'active' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-yg-darkgray">다음 결제일</span>
                    <span className="font-semibold text-yg-primary">
                      {product.nextPaymentDate}
                    </span>
                  </div>
                )}
              </div>

              {/* 상태 변경 버튼 */}
              <button
                onClick={() => handleToggleStatus(product._id, product.status)}
                disabled={updatingProductId === product._id}
                className={`w-full rounded-[50px] font-semibold py-3 shadow-lg transition ${
                  product.status === 'active'
                    ? 'bg-yg-gray text-yg-white hover:bg-opacity-90'
                    : 'bg-yg-primary text-yg-white hover:bg-opacity-90'
                } ${
                  updatingProductId === product._id
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {updatingProductId === product._id
                  ? '처리 중...'
                  : product.status === 'active'
                  ? '구독 일시정지'
                  : '구독 재개'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yg-lightgray rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-yg-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
          <p className="text-yg-darkgray mb-6">현재 구독 중인 상품이 없습니다.</p>
          <button
            onClick={onNavigateToSubscription}
            className="bg-yg-primary rounded-[50px] text-yg-white font-semibold px-8 py-3 shadow-lg hover:bg-opacity-90 transition"
          >
            구독하러 가기
          </button>
        </div>
      )}
    </TabCard>
  );
}