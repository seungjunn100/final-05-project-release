'use client';
import '@/app/globals.css';
import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
}

interface OrdererInfo {
  name: string;
  phone: string;
  email: string;
}

interface ShippingInfo {
  name: string;
  phone: string;
  address1: string;
  address2: string;
}

interface PaymentInfo {
  products: Product[];
  totalAmount: number;
  paymentMethod: string;
  ordererInfo: OrdererInfo;
  shippingInfo: ShippingInfo;
  couponDiscount: number;
  pointUsed: number;
  shippingFee: number;
}

// sessionStorage에서 결제 정보 가져오는 함수
const getPaymentInfo = (): PaymentInfo | null => {
  if (typeof window === 'undefined') return null;
  const storedInfo = sessionStorage.getItem('paymentInfo');
  if (storedInfo) {
    return JSON.parse(storedInfo) as PaymentInfo;
  }
  return null;
};

export default function PaymentComplete() {
  const [paymentInfo] = useState<PaymentInfo | null>(getPaymentInfo);

  const handleGoHome = () => {
    // sessionStorage 정리
    sessionStorage.removeItem('paymentInfo');
  };

  if (!paymentInfo) {
    return (
      <div className="w-full min-h-screen bg-yg-white flex items-center justify-center">
        <p>결제 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden flex items-center justify-center py-10">
      <div className="max-w-3xl w-full px-4">
        <div className="p-10 shadow-lg rounded-[50px] border border-yg-primary bg-white">
          {/* 완료 아이콘 */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-yg-primary rounded-[50px] flex items-center justify-center">
              <svg className="w-12 h-12 text-yg-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* 완료 메시지 */}
          <h1 className="text-3xl font-bold text-center">결제가 완료되었습니다!</h1>
          <p className="text-center text-yg-darkgray my-8">
            주문해주셔서 감사합니다. 곧 배송을 시작하겠습니다.
          </p>

          {/* 결제 정보 요약 */}
          <div className="bg-yg-white shadow-lg rounded-[50px] p-8 my-8">
            <h2 className="font-bold text-lg mb-4">결제 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-yg-darkgray">결제 방법</span>
                <span className="font-semibold">{paymentInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yg-darkgray">결제 금액</span>
                <span className="font-bold text-yg-primary text-xl">
                  {paymentInfo.totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 주문 상품 */}
          <div className="bg-yg-white shadow-lg rounded-[50px] p-8 my-8">
            <h2 className="font-bold text-lg mb-4">주문 상품</h2>
            <div className="space-y-3">
              {paymentInfo.products.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-yg-darkgray">수량: {product.quantity}개</p>
                  </div>
                  <p className="font-semibold">
                    {(product.price * product.quantity).toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-yg-white shadow-lg rounded-[50px] p-8 my-8">
            <h2 className="font-bold text-lg mb-4">배송 정보</h2>
            <div className="space-y-2">
              <p className="font-semibold">{paymentInfo.shippingInfo.name}</p>
              <p className="text-yg-darkgray">{paymentInfo.shippingInfo.phone}</p>
              <p className="text-yg-darkgray">{paymentInfo.shippingInfo.address1}</p>
              <p className="text-yg-darkgray">{paymentInfo.shippingInfo.address2}</p>
            </div>
          </div>

          {/* 버튼 */}
          <div className='className="w-full bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition'>
            <Link
              href="/"
              onClick={handleGoHome}
              className="w-full block text-center"
            >
              홈으로
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}