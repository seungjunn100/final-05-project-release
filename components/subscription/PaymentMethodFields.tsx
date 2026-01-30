import Dropdown from './Dropdown';
import { BANK_OPTIONS } from '@/app/subscription/lib/constants';

interface PaymentDetails {
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  accountBank: string;
  depositorName: string;
  phoneNumber: string;
}

interface PaymentMethodFieldsProps {
  paymentMethod: string;
  paymentDetails: PaymentDetails;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
}

export default function PaymentMethodFields({
  paymentMethod,
  paymentDetails,
  onPaymentDetailsChange,
}: PaymentMethodFieldsProps) {
  const updateField = (field: keyof PaymentDetails, value: string) => {
    onPaymentDetailsChange({ ...paymentDetails, [field]: value });
  };

  // 신용카드
  if (paymentMethod === '신용카드') {
    return (
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="카드 번호 (0000-0000-0000-0000)"
          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.cardNumber}
          onChange={(e) => updateField('cardNumber', e.target.value)}
        />
        <input
          type="text"
          placeholder="유효기간 (MM/YY)"
          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.cardExpiry}
          onChange={(e) => updateField('cardExpiry', e.target.value)}
        />
        <input
          type="text"
          placeholder="CVC"
          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.cardCVC}
          onChange={(e) => updateField('cardCVC', e.target.value)}
        />
      </div>
    );
  }

  // 가상계좌
  if (paymentMethod === '가상계좌') {
    return (
      <div className="flex flex-col gap-3">
        <Dropdown
          options={BANK_OPTIONS}
          value={paymentDetails.accountBank}
          onChange={(value) => updateField('accountBank', value)}
          placeholder="은행 선택"
        />
        <input
          type="text"
          placeholder="입금자명"
          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.depositorName}
          onChange={(e) => updateField('depositorName', e.target.value)}
        />
        <p className="text-sm text-yg-darkgray px-5">* 가상계좌 번호는 주문 완료 후 발급됩니다.</p>
      </div>
    );
  }

  // 무통장 입금
  if (paymentMethod === '무통장 입금') {
    return (
      <div className="flex flex-col gap-3">
        <div className="p-3 text-sm text-yg-primary">
          <p className="font-semibold">입금 계좌</p>
          <p>KB국민은행 123-456-789012</p>
          <p>예금주: (주)그린약국</p>
        </div>
        <input
          type="text"
          placeholder="입금자명"
          className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.depositorName}
          onChange={(e) => updateField('depositorName', e.target.value)}
        />
        <p className="px-3 text-sm text-yg-warning">주문 후 3일 이내 입금하지 않으면 자동 취소됩니다.</p>
      </div>
    );
  }

  // 핸드폰 결제
  if (paymentMethod === '핸드폰 결제') {
    return (
      <div className="flex flex-col gap-3">
        <input
          type="tel"
          placeholder="휴대폰 번호 (010-0000-0000)"
          className="px-5 py-2 shadow-lg rounded-[50px] border border-yg-primary"
          value={paymentDetails.phoneNumber}
          onChange={(e) => updateField('phoneNumber', e.target.value)}
        />
        <p className="px-3 text-sm text-yg-warning">결제 승인 SMS가 발송됩니다.</p>
      </div>
    );
  }

  return null;
}
