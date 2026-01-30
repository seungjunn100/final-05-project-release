'use client';
import '@/app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from '@/components/mypage/ProfileCard';
import TabMenu from '@/components/mypage/TabMenu';
import UserInfoTab from '@/components/mypage/UserInfoTab';
import SubscriptionTab from '@/components/mypage/SubscriptionTab';
import SurveyTab from '@/components/mypage/SurveyTab';
import Modal from '@/components/mypage/Modal';

interface UserInfo {
  nickname: string;
  userId: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

interface SubscriptionInfo {
  isSubscribed: boolean;
  productName: string;
  dosage: string;
  paymentDate: string;
  nextPaymentDate: string;
}

type TabType = 'info' | 'subscription' | 'survey';

export default function MyPage() {
  const router = useRouter();

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '홍길동',
    userId: 'user123',
    age: 30,
    gender: '남성',
    height: 175,
    weight: 70,
  });

  // 구독 정보 상태
  const [subscriptionInfo] = useState<SubscriptionInfo>({
    isSubscribed: true,
    productName: '그린몬스터 다이어트 스페셜 2',
    dosage: '900mg 112정',
    paymentDate: '2026.01.15',
    nextPaymentDate: '2026.02.15',
  });

  // 로그아웃 모달 상태
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 회원탈퇴 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('info');

  // 사용자 정보 수정 저장
  const handleSaveUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    alert('회원정보가 수정되었습니다.');
  };

  // 로그아웃
  const handleLogout = () => {
    setShowLogoutModal(false);
    alert('로그아웃되었습니다.');
    router.push('/');
  };

  // 회원탈퇴
  const handleDeleteAccount = () => {
    if (deleteConfirmText === '회원탈퇴') {
      setShowDeleteModal(false);
      alert('회원탈퇴가 완료되었습니다.');
      router.push('/');
    } else {
      alert('입력한 문구가 일치하지 않습니다.');
    }
  };

  // 설문 데이터
  const surveys = [
    { id: 1, title: '건강 설문 #3', date: '2026.01.15' },
    { id: 2, title: '건강 설문 #2', date: '2025.01.10' },
    { id: 3, title: '건강 설문 #1', date: '2024.01.05' },
  ];

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <main>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row px-4 py-10 gap-6">
          {/* 왼쪽: 프로필 카드 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <ProfileCard nickname={userInfo.nickname} userId={userInfo.userId} onLogout={() => setShowLogoutModal(true)} onDeleteAccount={() => setShowDeleteModal(true)} />
          </div>

          {/* 오른쪽: 탭 컨텐츠 */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* 탭 메뉴 */}
            <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />

            {/* 사용자 정보 탭 */}
            {activeTab === 'info' && <UserInfoTab userInfo={userInfo} onSave={handleSaveUserInfo} />}

            {/* 구독 상태 탭 */}
            {activeTab === 'subscription' && <SubscriptionTab subscriptionInfo={subscriptionInfo} onNavigateToSubscription={() => router.push('/subscription')} />}

            {/* 설문 정보 탭 */}
            {activeTab === 'survey' && <SurveyTab surveys={surveys} onSurveyClick={() => router.push('/survey/result')} />}
          </div>
        </div>
      </main>

      {/* 로그아웃 모달 */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} title="로그아웃" onConfirm={handleLogout} confirmText="확인">
        <p className="text-center text-yg-darkgray mb-8">로그아웃하시겠습니까?</p>
      </Modal>

      {/* 회원탈퇴 모달 */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteConfirmText('');
        }}
        title="회원탈퇴"
        onConfirm={handleDeleteAccount}
        confirmText="탈퇴하기"
        confirmButtonClass="bg-yg-secondary"
      >
        <div className="bg-yg-secondary rounded-[50px] shadow-lg px-10 py-6 my-6">
          <h3 className="font-semibold mb-3 text-yg-white">⚠️ 주의사항</h3>
          <ul className="space-y-2 text-sm text-yg-white">
            <li>• 모든 개인정보가 영구적으로 삭제됩니다.</li>
            <li>• 구독 중인 서비스가 모두 해지됩니다.</li>
            <li>• 작성한 설문 내역이 삭제됩니다.</li>
            <li>• 탈퇴 후 복구가 불가능합니다.</li>
          </ul>
        </div>
        <p className="text-center text-sm mb-4">
          탈퇴를 진행하려면 아래에 <span className="font-semibold text-yg-secondary">회원탈퇴</span>를 입력하세요.
        </p>
        <input type="text" className="w-full px-5 py-3 shadow-lg rounded-[50px] border border-yg-secondary mb-6" placeholder="회원탈퇴" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} />
      </Modal>
    </div>
  );
}
