'use client';
import '@/app/globals.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemList from '@/components/subscription/ItemList';
import SectionCard from '@/components/subscription/SectionCard';
import Dropdown from '@/components/common/Dropdown';
import EditableInfoSection from '@/components/subscription/EditableInfoSection';
import CouponPointSection from '@/components/subscription/CouponPointSection';
import useUserStore from '@/store/userStore';
import { PAYMENT_OPTIONS, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/subscription/constants';
import type { RecommendedProduct, SubscriptionProduct, OrdererInfo, ShippingInfo, PaymentMethod } from '@/types/subscription';

export default function Subscription() {
  const router = useRouter();
  const hasLoadedRef = useRef(false);
  const user = useUserStore((state) => state.user);
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [point, setPoint] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);
  const [availablePoints] = useState(10000);
  const [agreed, setAgreed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [ordererInfo, setOrdererInfo] = useState<OrdererInfo>({ 
    name: user?.name || '사용자 이름',
    phone: user?.phone || '사용자 전화번호',
    email: user?.email || '사용자 이메일' });
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({ 
    name: user?.name || '수령자 이름', 
    phone: user?.phone || '수령자 전화번호', 
    address: user?.address || '수령지 주소', 
    addressDetail: user?.addressDetail || '수령지 상세주소'
  });

  useEffect(() => {
    // Strict Mode로 인한 중복 실행 방지
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    loadRecommendedProducts();
  }, []);

  const loadRecommendedProducts = () => {
    setIsLoadingProducts(true);

    try {
      const savedProducts = sessionStorage.getItem('recommendedProducts');
      
      if (!savedProducts) {
        setProducts([]);
        return;
      }

      const recommendedProducts = JSON.parse(savedProducts) as RecommendedProduct[];

      const subscriptionProducts: SubscriptionProduct[] = recommendedProducts.map((product, index) => ({
        id: index + 1,
        name: product.name,
        price: product.price,
        quantity: 1,
        checked: true,
        imageUrl: product.imageUrl,
      }));

      setProducts(subscriptionProducts);
      sessionStorage.removeItem('recommendedProducts');
    } catch (error) {
      console.error('추천 상품 로드 오류:', error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const toggleCheck = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  const increaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const decreaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  const calculateProductTotal = () => {
    return products.filter((p) => p.checked).reduce((sum, p) => sum + p.price * p.quantity, 0);
  };

  const calculateShippingFee = () => {
    const total = calculateProductTotal();
    return total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  };

  const calculateFinalTotal = () => {
    return calculateProductTotal() - couponDiscount - pointUsed + calculateShippingFee();
  };

  const applyCoupon = () => {
    if (coupon === '') {
      alert('쿠폰 코드를 입력해주세요.');
      return;
    }

    if (coupon === 'WELCOME10') {
      const discount = Math.floor(calculateProductTotal() * 0.1);
      setCouponDiscount(discount);
      alert(`쿠폰이 적용되었습니다! ${discount.toLocaleString()}원 할인`);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const useAllPoints = () => {
    const productTotal = calculateProductTotal() - couponDiscount;
    const maxUsablePoints = Math.min(availablePoints, productTotal);
    setPointUsed(maxUsablePoints);
    setPoint(maxUsablePoints.toString());
    alert(`${maxUsablePoints.toLocaleString()}원 포인트가 적용되었습니다!`);
  };

  const handlePointChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const productTotal = calculateProductTotal() - couponDiscount;

    if (numValue > availablePoints) {
      alert('보유 포인트를 초과할 수 없습니다.');
      return;
    }
    if (numValue > productTotal) {
      alert('상품 금액을 초과할 수 없습니다.');
      return;
    }

    setPoint(value);
    setPointUsed(numValue);
  };

  const handlePayment = async () => {
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const selectedProducts = products.filter((p) => p.checked);
    if (selectedProducts.length === 0) {
      alert('결제할 상품을 선택해주세요.');
      return;
    }

    if (!paymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }

    const orderName = selectedProducts.length === 1 ? selectedProducts[0].name : `${selectedProducts[0].name} 외 ${selectedProducts.length - 1}건`;

    try {
      const baseParams = {
        storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
        channelKey: 'channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5',
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: orderName,
        totalAmount: calculateFinalTotal(),
        currency: 'CURRENCY_KRW' as const,
        payMethod: paymentMethod as 'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER',
        customer: {
          customerId: ordererInfo.email,
          fullName: ordererInfo.name,
          phoneNumber: ordererInfo.phone,
          email: ordererInfo.email,
        },
      };

      const paymentParams = paymentMethod === 'VIRTUAL_ACCOUNT' ? { ...baseParams, virtualAccount: { accountExpiry: { validHours: 48 }, cashReceiptType: 'PERSONAL' as const, customerIdentifier: ordererInfo.phone } } : baseParams;

      const response = await PortOne.requestPayment(paymentParams);

      if (!response) {
        alert('결제 응답을 받지 못했습니다. 다시 시도해주세요.');
        return;
      }

      if (response.code !== undefined) {
        alert(`결제 실패: ${response.message}`);
        return;
      }

      sessionStorage.setItem('paymentInfo', JSON.stringify({ paymentId: response.paymentId, products: selectedProducts, totalAmount: calculateFinalTotal(), paymentMethod: paymentMethod, ordererInfo: ordererInfo, shippingInfo: shippingInfo, couponDiscount: couponDiscount, pointUsed: pointUsed, shippingFee: calculateShippingFee() }));

      router.push('/subscription/complete');
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoadingProducts) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yg-primary mb-4"></div>
          <p className="text-lg text-yg-darkgray">추천 상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 구독할 상품이 없는 경우
  if (products.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="p-15 shadow-lg rounded-[50px] bg-yg-white text-center">
            {/* 아이콘 */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yg-lightgray rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-yg-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            {/* 메시지 */}
            <h2 className="text-2xl font-bold mb-3">나에게 맞는 영양제를 알아보아요</h2>
            <p className="text-yg-darkgray mb-8">
              AI 설문을 통해 맞춤 영양제를 추천받거나,<br />
              상품 목록에서 직접 구독할 상품을 선택해보세요.
            </p>

            {/* 버튼 */}
            <div className="flex flex-col gap-3">
              <button onClick={() => router.push('/survey')} className="w-full bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition">
                AI 추천받기
              </button>
              <button onClick={() => router.push('/products')} className="w-full bg-yg-white rounded-[50px] text-yg-primary font-semibold py-3 shadow-lg border border-yg-primary hover:bg-opacity-90 transition">
                상품 목록 둘러보기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-cover bg-fixed bg-white my-8">
      <main>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row py-5 gap-8">
          <section className="w-full flex flex-col gap-6">
            <SectionCard title="주문 상품 목록">
              <ItemList products={products} onToggleCheck={toggleCheck} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} />
            </SectionCard>

            <EditableInfoSection title="주문자 정보" type="orderer" data={ordererInfo} onSave={(data) => setOrdererInfo(data as typeof ordererInfo)} readOnly={true} />

            <EditableInfoSection title="배송 정보" type="shipping" data={shippingInfo} onSave={(data) => setShippingInfo(data as typeof shippingInfo)} />

            <CouponPointSection coupon={coupon} point={point} availablePoints={availablePoints} onCouponChange={setCoupon} onPointChange={handlePointChange} onApplyCoupon={applyCoupon} onUseAllPoints={useAllPoints} />
          </section>

          <section className="w-full flex flex-col gap-6">
            <SectionCard title="총 결제 금액">
              <ul>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">상품 가격</p>
                  <p className="whitespace-nowrap">{calculateProductTotal().toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">쿠폰 할인</p>
                  <p className="whitespace-nowrap">−{couponDiscount.toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">포인트 사용</p>
                  <p className="whitespace-nowrap">−{pointUsed.toLocaleString()}원</p>
                </li>
                <li className="flex justify-between my-1">
                  <p className="text-yg-darkgray whitespace-nowrap">배송비</p>
                  <p className="whitespace-nowrap">+{calculateShippingFee().toLocaleString()}원</p>
                </li>
                <br />
                <li className="flex justify-between">
                  <p className="text-lg whitespace-nowrap">총 결제 금액</p>
                  <p className="text-lg font-bold text-yg-primary whitespace-nowrap">{calculateFinalTotal().toLocaleString()}원</p>
                </li>
              </ul>
            </SectionCard>

            <SectionCard title="결제 방법">
              <div className="flex flex-col gap-4">
                <Dropdown options={PAYMENT_OPTIONS} value={paymentMethod} onChange={(value) => setPaymentMethod(value as typeof paymentMethod)} placeholder="결제 방법 선택하기" />
              </div>
            </SectionCard>

            <SectionCard title="구매 동의">
              <div className="flex items-baseline gap-2">
                <input type="checkbox" id="agreement" className="agreement" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <label htmlFor="agreement" className="mb-0">[필수] 개인정보 수집 및 이용에 동의합니다.</label>
              </div>
            </SectionCard>

            <button className="bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition" onClick={handlePayment}>결제하기</button>
          </section>
        </div>
      </main>
    </div>
  );
}