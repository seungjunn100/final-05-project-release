import { useState, useEffect } from 'react';
import TabCard from './TabCard';
import Button from '@/components/common/Button';
import type { UserInfo } from '@/types/mypage';

interface UserInfoTabProps {
  userInfo: UserInfo;
  onSave: (info: UserInfo) => void;
}

export default function UserInfoTab({ userInfo, onSave }: UserInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);

  useEffect(() => {
    setFormData(userInfo);
  }, [userInfo]);

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  return (
    <TabCard>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">사용자 정보</h1>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="primary"
            size="sm"
          >
            수정
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-4">
          {/* 이름 - 수정 가능 */}
          <div className="flex flex-col gap-2">
            <label className="text-yg-primary font-semibold">이름</label>
            <input type="text" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          {/* 이메일 - 읽기 전용 */}
          <div className="flex flex-col gap-2">
            <label className="text-yg-primary font-semibold">이메일</label>
            <input type="email" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-lightgray bg-yg-lightgray text-yg-darkgray cursor-not-allowed" value={formData.email} disabled readOnly />
            <p className="text-xs text-yg-darkgray pl-5">이메일은 변경할 수 없습니다.</p>
          </div>

          {/* 전화번호 - 수정 가능 */}
          <div className="flex flex-col gap-2">
            <label className="text-yg-primary font-semibold">전화번호</label>
            <input type="tel" className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 mt-4">
            <Button 
              onClick={handleCancel}
              variant="gray"
              className="flex-1"
            >
              취소
            </Button>
            <Button 
              onClick={handleSave}
              variant="primary"
              className="flex-1"
            >
              저장
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">이름</span>
            <span className="font-semibold">{userInfo.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">이메일</span>
            <span className="font-semibold">{userInfo.email}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-yg-darkgray">전화번호</span>
            <span className="font-semibold">{userInfo.phone}</span>
          </div>
        </div>
      )}
    </TabCard>
  );
}