'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import useUserStore from '@/store/userStore';
import { logout } from '@/actions/auth';

export default function HeaderInner() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const hydrated = useUserStore((state) => state.hydrated);

  const handleLogout = async () => {
    await logout();
    resetUser();
    alert(`감사합니다, ${user?.name}님!\n로그아웃이 완료되었습니다!`);
  };

  return (
    <header className="sticky top-0 h-15 bg-white border-b border-b-gray-200 z-1000 md:h-20">
      <div className="flex justify-between items-center h-full px-4 xl:px-0 xl:w-6xl xl:mx-auto">
        <Link href="/">
          <Image width={58} height={58} src="/icons/logo.svg" alt="영구 로고" className="md:w-20 md:h-20" />
        </Link>

        {hydrated ? (
          <nav>
            <ul id="site-nav" className={[isOpen ? 'block' : 'hidden', `fixed right-4 top-18 p-4 bg-white border border-gray-200 rounded-2xl md:top-24 lg:flex lg:gap-6 lg:items-center lg:static lg:p-0 lg:bg-inherit lg:border-0 lg:rounded-none`].join(' ')}>
              <li className="mb-2 lg:mb-0">
                <Link href="/survey" className="block px-3 py-1 font-medium text-[12px] text-white text-center bg-yg-secondary rounded-full md:text-[14px]">
                  AI 추천받기
                </Link>
              </li>
              <li className="mb-2 lg:mb-0">
                <Link href="/products" className="block text-yg-black font-medium text-[14px] md:text-[16px]">
                  영양제 정보
                </Link>
              </li>
              {user ? (
                <>
                  <li className="mb-2 lg:mb-0">
                    <Link href="/mypage" className="block text-yg-black font-medium text-[14px] md:text-[16px]">
                      마이페이지
                    </Link>
                  </li>
                  <li>
                    <Link href="/subscription" className="block text-yg-black font-medium text-[14px] md:text-[16px]">
                      구독하기
                    </Link>
                  </li>
                  <li className="mb-2 lg:mb-0">
                    <button type="button" onClick={handleLogout} className="block w-full text-yg-black font-semibold text-[14px] text-left cursor-pointer md:text-[16px]">
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-2 lg:mb-0">
                    <Link href="/login" className="block text-yg-black font-medium text-[14px] md:text-[16px]">
                      로그인
                    </Link>
                  </li>
                  <li className="mb-2 lg:mb-0">
                    <Link href="/signup" className="block text-yg-black font-medium text-[14px] md:text-[16px]">
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button type="button" className="block lg:hidden" onClick={() => setIsOpen((prev) => !prev)} aria-expanded={isOpen} aria-controls="site-nav" aria-label="메뉴 열기/닫기">
              <Image width={32} height={32} src="/icons/all-menu.svg" alt="전체 메뉴" className="md:w-10 md:h-10" />
            </button>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
