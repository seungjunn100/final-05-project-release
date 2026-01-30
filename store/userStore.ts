import { User } from '@/types/auth';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 사용자 인증 상태 관리 스토어 타입
interface UserStoreState {
  user: User | null;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  resetUser: () => void;
  setHydrated: () => void;
}

// 사용자 정보 스토어의 초기값과 액션(함수)을 정의
const UserStore: StateCreator<UserStoreState> = (set) => ({
  user: null,
  hydrated: false,
  setUser: (user: User | null) => set({ user }),
  resetUser: () => set({ user: null }),
  setHydrated: () => set({ hydrated: true }),
});

// 사용자 정보를 세션스토리지에 저장
// 브라우저 탭이 유지되는 동안 로그인 상태가 유지되며, 탭을 닫으면 초기화
const useUserStore = create<UserStoreState>()(
  persist(UserStore, {
    name: 'user',
    storage: createJSONStorage(() => sessionStorage),
    onRehydrateStorage: () => (state) => {
      state?.setHydrated();
    },
  })
);

export default useUserStore;
