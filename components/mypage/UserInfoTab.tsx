import { useState, useEffect } from 'react';
import TabCard from './TabCard';
import type { UserInfo } from '@/types/mypage';
import Dropdown from '@/components/common/Dropdown';
import { GENDER_OPTIONS } from '@/lib/mypage/constants';

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
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yg-primary px-6 py-2 rounded-[50px] font-semibold text-yg-white shadow-lg"
          >
            수정
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-yg-primary font-semibold">닉네임</label>
            <input
              type="text"
              className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-yg-primary font-semibold">이메일</label>
            <input
              type="text"
              className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary bg-gray-100"
              value={formData.email}
              disabled
            />
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-yg-primary font-semibold">연령</label>
              <input
                type="number"
                className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                min={0}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-yg-primary font-semibold">성별</label>
              <Dropdown
                options={GENDER_OPTIONS}
                value={formData.gender}
                onChange={(value) => setFormData({ ...formData, gender: value })}
                className="[&>button]:py-3 [&>button]:px-5"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-yg-primary font-semibold">키 (cm)</label>
              <input
                type="number"
                className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                min={45}
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-yg-primary font-semibold">몸무게 (kg)</label>
              <input
                type="number"
                className="px-5 py-3 shadow-lg rounded-[50px] border border-yg-primary"
                min={1}
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-yg-gray rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">닉네임</span>
            <span className="font-semibold">{userInfo.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">이메일</span>
            <span className="font-semibold">{userInfo.email}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">연령</span>
            <span className="font-semibold">{userInfo.age}세</span>
          </div>
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">성별</span>
            <span className="font-semibold">{userInfo.gender}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-yg-lightgray">
            <span className="text-yg-darkgray">키</span>
            <span className="font-semibold">{userInfo.height}cm</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-yg-darkgray">몸무게</span>
            <span className="font-semibold">{userInfo.weight}kg</span>
          </div>
        </div>
      )}
    </TabCard>
  );
}