'use client';
import '@/app/globals.css';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SyncLoader } from 'react-spinners';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemList from '@/components/subscription/ItemList';
import SectionCard from '@/components/subscription/SectionCard';
import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import EditableInfoSection from '@/components/subscription/EditableInfoSection';
import CouponPointSection from '@/components/subscription/CouponPointSection';
import Checkbox from '@/components/subscription/Checkbox';
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
    phone: user?.phone || '01000000000',
    email: user?.email || '사용자 이메일' 
  });
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

  const loadRecommendedProducts = async () => {
    setIsLoadingProducts(true);

    try {
      // 1. sessionStorage에서 먼저 확인
      const savedProducts = sessionStorage.getItem('recommendedProducts');
      
      if (savedProducts) {
        const recommendedProducts = JSON.parse(savedProducts) as RecommendedProduct[];
        const subscriptionProducts: SubscriptionProduct[] = recommendedProducts.map((product) => ({
          id: parseInt(product.id), // 실제 상품 ID 사용
          name: product.name,
          price: product.price,
          quantity: 1,
          checked: true,
          imageUrl: product.imageUrl,
        }));
        setProducts(subscriptionProducts);
        sessionStorage.removeItem('recommendedProducts');
        setIsLoadingProducts(false);
        return;
      }

      // 2. sessionStorage에 없으면 최근 설문 자동 확인
      const { getSurveysFromServer } = await import('@/lib/api/survey');
      const result = await getSurveysFromServer();

      if (result.ok === 1 && result.item && result.item.length > 0) {
        // 최근 설문이 있으면 자동으로 불러오기
        const latestSurvey = result.item[0];
        const recommendedProducts = latestSurvey.memo.supplements;

        const subscriptionProducts: SubscriptionProduct[] = recommendedProducts.map((product) => ({
          id: parseInt(product.id), // 실제 상품 ID 사용
          name: product.name,
          price: product.price,
          quantity: 1,
          checked: true,
          imageUrl: product.imageUrl,
        }));

        setProducts(subscriptionProducts);
      } else {
        // 설문이 없으면 빈 배열
        setProducts([]);
      }
    } catch (error) {
      console.error('추천 상품 로드 오류:', error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const toggleCheck = (id: number) => {
    const newProducts = products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p));
    setProducts(newProducts);
    
    // 체크 변경 후 할인 금액 재조정
    const newProductTotal = newProducts
      .filter((p) => p.checked)
      .reduce((sum, p) => sum + p.price * p.quantity, 0);
    
    // 쿠폰 코드가 입력된 상태라면 항상 재계산
    if (coupon !== '') {
      const newDiscount = Math.floor(newProductTotal * 0.5);
      setCouponDiscount(newDiscount);
    }
    
    // 포인트가 (상품 가격 - 쿠폰 할인)보다 크면 재조정
    const newCouponDiscount = coupon !== '' ? Math.floor(newProductTotal * 0.5) : couponDiscount;
    const afterCoupon = Math.max(0, newProductTotal - newCouponDiscount);
    if (pointUsed > afterCoupon) {
      const newPointUsed = Math.min(availablePoints, afterCoupon);
      setPointUsed(newPointUsed);
      setPoint(newPointUsed.toString());
    }
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
    const productTotal = calculateProductTotal();
    const afterDiscount = Math.max(0, productTotal - couponDiscount - pointUsed);
    return afterDiscount + calculateShippingFee();
  };

  const applyCoupon = () => {
    if (coupon === 'WELCOME10') {
      const productTotal = calculateProductTotal();
      const discount = Math.floor(productTotal * 0.5);
      setCouponDiscount(discount);
      alert(`쿠폰이 적용되었습니다! ${discount.toLocaleString()}원 할인`);
    } else {
      alert('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const useAllPoints = () => {
    const productTotal = calculateProductTotal();
    const afterCoupon = Math.max(0, productTotal - couponDiscount);
    const maxUsablePoints = Math.min(availablePoints, afterCoupon);
    setPointUsed(maxUsablePoints);
    setPoint(maxUsablePoints.toString());
    alert(`${maxUsablePoints.toLocaleString()}원 포인트가 적용되었습니다!`);
  };

  const handlePointChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const productTotal = calculateProductTotal();
    const afterCoupon = Math.max(0, productTotal - couponDiscount);

    if (numValue > availablePoints) {
      alert('보유 포인트를 초과할 수 없습니다.');
      return;
    }
    if (numValue > afterCoupon) {
      alert('상품 금액을 초과할 수 없습니다.');
      return;
    }

    setPoint(value);
    setPointUsed(numValue);
  };


  // 실제 결제용 코드
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

    if (!shippingInfo.address || !shippingInfo.address.trim()) {
      alert('배송지 주소를 입력해주세요.');
      return;
    }

    if (!shippingInfo.addressDetail || !shippingInfo.addressDetail.trim()) {
      alert('배송지 상세주소를 입력해주세요.');
      return;
    }

    const finalTotal = calculateFinalTotal();
    if (finalTotal < 0) {
      alert('결제 금액이 0원 미만입니다. 상품을 다시 확인해주세요.');
      return;
    }

    // 새로운 결제 시작: 이메일 플래그 초기화
    sessionStorage.removeItem('paymentEmailSent');

    // 실제 결제 코드
    const orderName = selectedProducts.length === 1 ? selectedProducts[0].name : `${selectedProducts[0].name} 외 ${selectedProducts.length - 1}건`;

    try {
      const baseParams = {
        storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
        channelKey: 'channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5',
        paymentId: `payment-${crypto.randomUUID()}`,
        orderName: orderName,
        totalAmount: finalTotal,
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

      sessionStorage.setItem('paymentInfo', JSON.stringify({ 
        paymentId: response.paymentId, 
        products: selectedProducts, 
        totalAmount: finalTotal, 
        paymentMethod: paymentMethod, 
        ordererInfo: ordererInfo, 
        shippingInfo: shippingInfo, 
        couponDiscount: couponDiscount, 
        pointUsed: pointUsed, 
        shippingFee: calculateShippingFee() 
      }));

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
          <SyncLoader color="#4ac5b2" size={12} margin={4} />
          <p className="text-lg text-yg-darkgray mt-4">추천 상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 구독할 상품이 없는 경우
  if (products.length === 0) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full px-4">
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
              <Button 
                onClick={() => router.push('/survey')} 
                variant="primary"
                className="w-full"
              >
                AI 추천받기
              </Button>
              <Button 
                onClick={() => router.push('/products')} 
                variant="secondary"
                className="w-full"
              >
                상품 목록 둘러보기
              </Button>
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
              <Checkbox
                checked={agreed}
                onChange={setAgreed}
                label="[필수] 개인정보 수집 및 이용에 동의합니다."
              />
            </SectionCard>

            <Button 
              onClick={handlePayment}
              variant="primary"
              className="w-full"
            >
              결제하기
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}