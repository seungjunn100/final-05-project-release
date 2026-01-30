'use client';
import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as PortOne from '@portone/browser-sdk/v2';
import ItemList from '@/components/subscription/ItemList';
import SectionCard from '@/components/subscription/SectionCard';
import Dropdown from '@/components/subscription/Dropdown';
import EditableInfoSection from '@/components/subscription/EditableInfoSection';
import CouponPointSection from '@/components/subscription/CouponPointSection';
import { PAYMENT_OPTIONS, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/subscription/constants';

export default function Subscription() {
  const router = useRouter();

  // 상품 데이터 (실제로는 API에서 가져올 데이터)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '그린몬스터 다이어트 스페셜 2 가르시니아 900 112정',
      price: 12700,
      quantity: 1,
      checked: true,
    },
    {
      id: 2,
      name: '루테인 지아잔틴 GR 4박스 4개월분 캡슐',
      price: 72000,
      quantity: 1,
      checked: true,
    },
  ]);

  // 쿠폰/포인트
  const [coupon, setCoupon] = useState('');
  const [point, setPoint] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [pointUsed, setPointUsed] = useState(0);
  const [availablePoints] = useState(10000);

  // 구매 동의
  const [agreed, setAgreed] = useState(false);

  // 주문자 정보
  const [ordererInfo, setOrdererInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    email: 'user@gmail.com',
  });

  // 배송 정보
  const [shippingInfo, setShippingInfo] = useState({
    name: '홍길동',
    phone: '01012345678',
    address1: '서울 종로구 종로3길17',
    address2: '광화문D타워 D1동 16층, 17층',
  });

  // 결제 방법
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'VIRTUAL_ACCOUNT' | 'TRANSFER' | ''>('');

  // 상품 관리
  const toggleCheck = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p)));
  };

  const increaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
  };

  const decreaseQuantity = (id: number) => {
    setProducts(products.map((p) => (p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p)));
  };

  // 계산 함수
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

  // 쿠폰 적용
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

  // 포인트 전액 사용
  const useAllPoints = () => {
    const productTotal = calculateProductTotal() - couponDiscount;
    const maxUsablePoints = Math.min(availablePoints, productTotal);
    setPointUsed(maxUsablePoints);
    setPoint(maxUsablePoints.toString());
    alert(`${maxUsablePoints.toLocaleString()}원 포인트가 적용되었습니다!`);
  };

  // 포인트 입력 처리
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

  // PortOne 결제 요청
  const handlePayment = async () => {
    // 검증
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

    // 주문 이름 생성
    const orderName =
      selectedProducts.length === 1
        ? selectedProducts[0].name
        : `${selectedProducts[0].name} 외 ${selectedProducts.length - 1}건`;

    // 포트원 결제 요청
    try {
      // 기본 결제 파라미터
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

      // 가상계좌 결제 시 추가 정보
      const paymentParams =
        paymentMethod === 'VIRTUAL_ACCOUNT'
          ? {
              ...baseParams,
              virtualAccount: {
                accountExpiry: {
                  validHours: 48, // 48시간 유효
                },
                cashReceiptType: 'PERSONAL' as const, // 개인 소득공제용
                customerIdentifier: ordererInfo.phone, // 휴대폰 번호
              },
            }
          : baseParams;

      const response = await PortOne.requestPayment(paymentParams);

      // response가 없는 경우 처리
      if (!response) {
        alert('결제 응답을 받지 못했습니다. 다시 시도해주세요.');
        return;
      }

      // 결제 결과 처리
      if (response.code !== undefined) {
        // 오류 발생
        alert(`결제 실패: ${response.message}`);
        return;
      }

      // 결제 성공 - 서버에 결제 정보 전달 및 검증
      // TODO: 실제 서버 엔드포인트 구현 필요
      // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     paymentId: response.paymentId,
      //     ordererInfo,
      //     shippingInfo,
      //     products: selectedProducts,
      //     couponDiscount,
      //     pointUsed,
      //   }),
      // });

      // 임시: sessionStorage에 저장 후 결제 완료 페이지로 이동
      sessionStorage.setItem(
        'paymentInfo',
        JSON.stringify({
          paymentId: response.paymentId,
          products: selectedProducts,
          totalAmount: calculateFinalTotal(),
          paymentMethod: paymentMethod,
          ordererInfo: ordererInfo,
          shippingInfo: shippingInfo,
          couponDiscount: couponDiscount,
          pointUsed: pointUsed,
          shippingFee: calculateShippingFee(),
        })
      );

      router.push('/subscription/complete');
    } catch (error) {
      console.error('결제 오류:', error);
      alert('결제 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-cover bg-fixed bg-white my-8 overflow-x-hidden">
        <main>
          <div className="min-w-6xl mx-auto flex lg:px-40 2xl:px-80 py-5 gap-7.5">
            {/* 왼쪽 영역 */}
            <section className="w-79/120 min-w-175 flex flex-col gap-6">
              {/* 1. 주문 상품 정보 */}
              <SectionCard title="주문 상품 목록">
                <ItemList
                  products={products}
                  onToggleCheck={toggleCheck}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />
              </SectionCard>

              {/* 2. 주문자 정보 */}
              <EditableInfoSection
                title="주문자 정보"
                type="orderer"
                data={ordererInfo}
                onSave={(data) => setOrdererInfo(data as typeof ordererInfo)}
              />

              {/* 3. 배송 정보 */}
              <EditableInfoSection
                title="배송 정보"
                type="shipping"
                data={shippingInfo}
                onSave={(data) => setShippingInfo(data as typeof shippingInfo)}
              />

              {/* 4. 쿠폰/포인트 */}
              <CouponPointSection
                coupon={coupon}
                point={point}
                availablePoints={availablePoints}
                onCouponChange={setCoupon}
                onPointChange={handlePointChange}
                onApplyCoupon={applyCoupon}
                onUseAllPoints={useAllPoints}
              />
            </section>

            {/* 오른쪽 영역 */}
            <section className="w-38/120 min-w-82.5 flex flex-col gap-6">
              {/* 5. 총 결제 금액 */}
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
                    <p className="text-lg font-bold text-yg-primary whitespace-nowrap">
                      {calculateFinalTotal().toLocaleString()}원
                    </p>
                  </li>
                </ul>
              </SectionCard>

              {/* 6. 결제 방법 */}
              <SectionCard title="결제 방법">
                <div className="flex flex-col gap-4">
                  <Dropdown
                    options={PAYMENT_OPTIONS}
                    value={paymentMethod}
                    onChange={(value) => setPaymentMethod(value as typeof paymentMethod)}
                    placeholder="결제 방법 선택하기"
                  />
                </div>
              </SectionCard>

              {/* 7. 구매 동의 */}
              <SectionCard title="구매 동의">
                <div className="flex items-baseline gap-2">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="agreement" className="mb-0">
                    [필수] 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>
              </SectionCard>

              {/* 8. 결제하기 */}
              <button
                className="bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition"
                onClick={handlePayment}
              >
                결제하기
              </button>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}