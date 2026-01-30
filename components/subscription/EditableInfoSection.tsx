import { useState } from 'react';
import SectionCard from '@/components/subscription/SectionCard';

interface BaseInfo {
  name: string;
  phone: string;
}

interface OrdererInfo extends BaseInfo {
  email: string;
}

interface ShippingInfo extends BaseInfo {
  address1: string;
  address2: string;
}

type InfoData = OrdererInfo | ShippingInfo;

interface EditableInfoSectionProps {
  title: string;
  type: 'orderer' | 'shipping';
  data: InfoData;
  onSave: (data: InfoData) => void;
}

export default function EditableInfoSection({ title, type, data, onSave }: EditableInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    // 주문자 정보 검증
    if (type === 'orderer') {
      const ordererData = formData as OrdererInfo;
      if (!ordererData.name || !ordererData.phone || !ordererData.email) {
        alert('모든 정보를 입력해주세요.');
        return;
      }
    }
    
    // 배송 정보 검증
    if (type === 'shipping') {
      const shippingData = formData as ShippingInfo;
      if (!shippingData.name || !shippingData.phone || !shippingData.address1) {
        alert('필수 정보를 입력해주세요.');
        return;
      }
    }

    onSave(formData);
    setIsEditing(false);
    alert(`${type === 'orderer' ? '주문자' : '배송'} 정보가 저장되었습니다.`);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const ordererData = formData as OrdererInfo;
  const shippingData = formData as ShippingInfo;

  return (
    <SectionCard title={title}>
      {isEditing ? (
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`${type}-name`} className="font-bold text-yg-primary">
              {type === 'orderer' ? '이름' : '수령인'}
            </label>
            <input
              id={`${type}-name`}
              type="text"
              className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`${type}-phone`} className="font-bold text-yg-primary">
              전화번호
            </label>
            <input
              id={`${type}-phone`}
              type="tel"
              className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          {/* 이메일 (주문자만) */}
          {type === 'orderer' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="orderer-email" className="font-bold text-yg-primary">
                이메일
              </label>
              <input
                id="orderer-email"
                type="email"
                className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                value={ordererData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value } as InfoData)}
              />
            </div>
          )}

          {/* 주소 (배송만) */}
          {type === 'shipping' && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="shipping-address1" className="font-bold text-yg-primary">
                  주소
                </label>
                <input
                  id="shipping-address1"
                  type="text"
                  className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                  value={shippingData.address1}
                  onChange={(e) => setFormData({ ...formData, address1: e.target.value } as InfoData)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="shipping-address2" className="font-bold text-yg-primary">
                  상세 주소
                </label>
                <input
                  id="shipping-address2"
                  type="text"
                  className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                  value={shippingData.address2}
                  onChange={(e) => setFormData({ ...formData, address2: e.target.value } as InfoData)}
                />
              </div>
            </>
          )}

          {/* 버튼 */}
          <div className="flex gap-3 justify-end">
            <button
              className="bg-yg-gray px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg"
              onClick={handleCancel}
            >
              취소
            </button>
            <button
              className="bg-yg-primary px-4 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg py-1">{data.name}</p>
            <p className={type === 'orderer' ? 'text-yg-darkgray' : 'text-yg-darkgray py-1'}>
              {data.phone}
            </p>
            {type === 'orderer' && <p className="text-yg-darkgray">{ordererData.email}</p>}
            {type === 'shipping' && (
              <>
                <p className="text-lg">{shippingData.address1}</p>
                <p className="text-lg">{shippingData.address2}</p>
              </>
            )}
          </div>
          <button
            className="bg-yg-primary px-2 w-18 h-12 rounded-[50px] font-semibold text-yg-white shadow-lg"
            onClick={() => setIsEditing(true)}
          >
            수정
          </button>
        </div>
      )}
    </SectionCard>
  );
}