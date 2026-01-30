import TabCard from './TabCard';

interface SubscriptionInfo {
  isSubscribed: boolean;
  productName: string;
  dosage: string;
  paymentDate: string;
  nextPaymentDate: string;
}

interface SubscriptionTabProps {
  subscriptionInfo: SubscriptionInfo;
  onNavigateToSubscription: () => void;
}

export default function SubscriptionTab({ subscriptionInfo, onNavigateToSubscription }: SubscriptionTabProps) {
  return (
    <TabCard>
      {subscriptionInfo.isSubscribed ? (
        <div className="space-y-4">
          <div className="bg-yg-white rounded-[50px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">현재 구독 중</h3>
              <span className="bg-yg-primary text-yg-white px-4 py-1 rounded-full text-sm font-semibold">
                활성
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-yg-darkgray">상품명</span>
                <span className="font-semibold">{subscriptionInfo.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yg-darkgray">용량</span>
                <span className="font-semibold">{subscriptionInfo.dosage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yg-darkgray">결제일</span>
                <span className="font-semibold">{subscriptionInfo.paymentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yg-darkgray">다음 결제일</span>
                <span className="font-semibold text-yg-primary">{subscriptionInfo.nextPaymentDate}</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-yg-secondary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition">
            구독 관리
          </button>
        </div>
      ) : (
        <div className="text-center py-10">
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