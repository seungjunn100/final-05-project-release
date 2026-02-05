'use client';
import '@/app/globals.css';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/actions/auth';
import { updateUserInfo } from '@/actions/mypage';
import useUserStore from '@/store/userStore';
import ProfileCard from '@/components/mypage/ProfileCard';
import TabMenu from '@/components/mypage/TabMenu';
import UserInfoTab from '@/components/mypage/UserInfoTab';
import SubscriptionTab from '@/components/mypage/SubscriptionTab';
import SurveyTab from '@/components/mypage/SurveyTab';
import Modal from '@/components/mypage/Modal';
import type { UserInfo, SubscriptionInfo, TabType } from '@/types/mypage';

export default function MyPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);
  const hydrated = useUserStore((state) => state.hydrated);

  // state hooks
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [subscriptionInfo] = useState<SubscriptionInfo>({
    isSubscribed: true,
    productName: '그린몬스터 다이어트 스페셜 2',
    dosage: '900mg 112정',
    paymentDate: '2026.01.15',
    nextPaymentDate: '2026.02.15',
  });

  // 조건부 return으로 인한 오류 방지
  const userInfo = useMemo<UserInfo>(
    () => ({
      name: user?.name || '기본 이름',
      email: user?.email || '기본 이메일',
      age: user?.age || '',
      gender: user?.gender === 'M' ? '남성' : user?.gender === 'F' ? '여성' : '기타',
      height: user?.height || '',
      weight: user?.weight || '',
    }),
    [user]
  );

  // 로그인 체크
  useEffect(() => {
    if (hydrated && !user) {
      alert('로그인이 필요한 서비스입니다.');
      router.replace('/login');
    }
  }, [hydrated, user, router]);

  // 조건부 return으로 인한 오류 방지
  if (!hydrated || !user) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yg-primary mb-4"></div>
          <p className="text-lg text-yg-darkgray">로딩 중...</p>
        </div>
      </div>
    );
  }

 // 사용자 정보 수정 저장
  const handleSaveUserInfo = async (info: UserInfo) => {
    if (!user?._id) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const result = await updateUserInfo(user._id, {
        name: info.name,
        age: info.age,
        gender: info.gender === '남성' ? 'M' : info.gender === '여성' ? 'F' : info.gender,
        height: info.height,
        weight: info.weight,
      });

      if (result.ok === 0 && result.message?.includes('인증')) {
        alert(result.message);
        await handleLogout();
        return;
      }

      if (result.ok === 0) {
        alert(result.message);
        return;
      }

      if (result.ok === 1 && result.item) {
        setUser({
          ...user,
          name: result.item.name,
          age: result.item.age,
          gender: result.item.gender,
          height: result.item.height,
          weight: result.item.weight,
        });
        alert('회원정보가 수정되었습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 수정 오류:', error);
      alert('사용자 정보 수정 중 오류가 발생했습니다.');
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      resetUser();
      setShowLogoutModal(false);
      alert(`감사합니다, ${user?.name}님!\n로그아웃이 완료되었습니다!`);
      router.replace('/');
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  // 회원탈퇴
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== '회원탈퇴') {
      alert('입력한 문구가 일치하지 않습니다.');
      return;
    }

    if (!user?._id) {
      console.error(' user 또는 _id 없음:', user);
      alert('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      router.replace('/login');
      return;
    }

    try {
      await logout();
      resetUser();
      setShowDeleteModal(false);
      alert('회원탈퇴가 완료되었습니다.');
      router.replace('/');
    } catch (error) {
      console.error('회원탈퇴 오류:', error);
      alert('회원탈퇴 중 오류가 발생했습니다.');
    }
  };

  // 설문 기록 상세 보기
  const handleSurveyClick = (targetId: string) => {
    router.push(`/survey/history/${targetId}`);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <main>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row px-4 py-10 gap-6">
          {/* 왼쪽: 프로필 카드 */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <ProfileCard name={userInfo.name} email={userInfo.email} onLogout={() => setShowLogoutModal(true)} onDeleteAccount={() => setShowDeleteModal(true)} />
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
            {activeTab === 'survey' && <SurveyTab onSurveyClick={handleSurveyClick} />}
          </div>
        </div>
      </main>

      {/* 로그아웃 모달 */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} title="로그아웃" onConfirm={handleLogout} confirmText="확인">
        <p className="text-center text-yg-darkgray mb-8">로그아웃하시겠습니까?</p>
      </Modal>

      {/* 회원탈퇴 모달 */}
      <Modal isOpen={showDeleteModal}onClose={() => { setShowDeleteModal(false); setDeleteConfirmText('') }} title="회원탈퇴" onConfirm={handleDeleteAccount} confirmText="탈퇴하기" confirmButtonClass="bg-yg-secondary">
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