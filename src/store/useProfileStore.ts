import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Profile {
  id: string;
  name: string;
  image: string;
  contentLimit: number;
  isKids: boolean;
  isDefault: boolean;
}

interface ProfileState {
  profiles: Profile[];
  // 현재 적용중&수정중인 프로필
  currentProfile: Profile | null;

  // 현재 생성중인 프로필
  initCurrentProfile: () => void;

  // 최초 프로필 디폴트값
  initDefaultProfiles: () => void;
  // 프로필 선택
  selectProfile: (profile: Profile) => void;

  // 프로필 추가
  addProfile: (profile: Profile) => void;
  // 프로필 수정
  updateProfile: (id: string, data: Partial<Profile>) => void;
  // 프로필 이미지 선택
  setProfileImage: (image: string) => void;

  // 프로필 삭제
  resetProfiles: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      currentProfile: null,

      // 새로운 프로필 생성
      initCurrentProfile: () =>
        set({
          currentProfile: {
            id: crypto.randomUUID(),
            name: '',
            image: '',
            contentLimit: 19,
            isKids: false,
            isDefault: false,
          },
        }),

      // 초반 디폴트값으로 생성되는 프로필
      initDefaultProfiles: () => {
        set((state) => {
          if (state.profiles.length > 0) return state;

          return {
            profiles: [
              {
                id: 'default-adult',
                name: '계정 1',
                image: '/images/profile/profile1.png',
                contentLimit: 19,
                isKids: false,
                isDefault: true,
              },
              {
                id: 'default-kid',
                name: '키즈',
                image: '/images/profile/kidsProfile_big.svg',
                contentLimit: 0,
                isKids: true,
                isDefault: true,
              },
            ],
          };
        });
      },

      // 선택한 프로필
      selectProfile: (profile) => {
        set({ currentProfile: profile });
      },

      // 프로필 추가
      addProfile: (profile) => {
        set((state) => ({
          profiles: [...state.profiles, profile],
        }));
      },

      updateProfile: (id, data) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...data } : p)),
        }));
      },

      setProfileImage: (image) =>
        set((state) => {
          if (!state.currentProfile) return state;

          return {
            currentProfile: {
              ...state.currentProfile,
              image,
            },
          };
        }),

      resetProfiles: () => ({
        profiles: [],
        currentProfile: null,
      }),
    }),
    {
      name: 'profile-storage',
    }
  )
);
