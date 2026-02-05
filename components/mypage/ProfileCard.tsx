import TabCard from './TabCard';

interface ProfileCardProps {
  name: string;
  email: string;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export default function ProfileCard({ name, email, onLogout, onDeleteAccount }: ProfileCardProps) {
  return (
    <TabCard>
      <div className="flex flex-col items-center mb-6">
        {/* 프로필 이미지 */}
        <div className="w-24 h-24 bg-yg-secondary rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-yg-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-yg-darkgray">{email}</p>
      </div>

      {/* 로그아웃 / 회원탈퇴 버튼 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onLogout}
          className="w-full bg-yg-primary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition"
        >
          로그아웃
        </button>
        <button
          onClick={onDeleteAccount}
          className="w-full bg-yg-secondary rounded-[50px] text-yg-white font-semibold py-3 shadow-lg hover:bg-opacity-90 transition"
        >
          회원탈퇴
        </button>
      </div>
    </TabCard>
  );
}