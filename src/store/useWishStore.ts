import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../api/auth';
import type { WishItem } from '../types/IWish_Watching';
import { useProfileStore } from './useProfileStore';

// zustand 관리에 대한 상태의 타입 정의
export interface WishState {
  wishlist: WishItem[];
  onToggleWish: (movie: WishItem) => Promise<void>;
  onFetchWish: () => Promise<void>;
  onResetWish: () => void;
}

export const useWishStore = create<WishState>((set, get) => ({
  // 찜목록을 저장할 배열
  wishlist: [],

  // wishlist를 추가/ 취소할 메서드
  onToggleWish: async (movie) => {
    // 1.로그인 상태 체크하기
    // useAuthStore에서 user 가져오기
    const user = useAuthStore.getState().user;
    if (!user) return console.log('로그인 필요');
    // 프로필 다른 전역 상태변수 가져오기
    const activeProfileId = useProfileStore.getState().activeProfileId;
    if (!activeProfileId) return;

    // 2. firestore에 해당 영화 문서 저장 / 참조
    // users/{uid}/profiles/{activeProfileId}/wishlsit/{movieId}
    const ref = doc(
      db,
      'users',
      user.uid,
      'profiles',
      activeProfileId,
      'wishlist',
      String(movie.id)
    );

    // 현재 wishlist에 있는지 정보 확인
    const exists = get().wishlist.find((w) => w.id === movie.id);

    if (exists) {
      // 이미 있는 영화면 삭제하기
      await deleteDoc(ref);
      console.log('wishlist에서 삭제되었습니다.');

      // id 값이 일치하는 데이터를 지우고, 일치하지 않는 데이터 반환
      set({
        wishlist: get().wishlist.filter((w) => w.id !== movie.id),
      });
    } else {
      // 없으면 추가하기
      await setDoc(ref, movie);
      console.log('찜 목록 추가');
      set({
        wishlist: [...get().wishlist, movie],
      });
    }
  },

  // 로그인 시 찜목록 가져오기
  onFetchWish: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return console.log('로그인 필요');

    const activeProfileId = useProfileStore.getState().activeProfileId;
    if (!activeProfileId) return console.log('프로필 선택 필요');

    try {
      // users/{uid}/profiles/{activeProfileId}/wishlsit/{movieId}
      const snap = await getDocs(
        collection(db, 'users', user.uid, 'profiles', activeProfileId, 'wishlist')
      );
      // 가져온 문서를 배열로 변한시켜 wishlist에 저장하기
      const data = snap.docs.map((doc) => doc.data());

      // zustand 상태 변수에 저장
      set({ wishlist: data });
    } catch (err) {
      console.error(err);
    }
  },

  // 로그아웃 시 회면 초기화
  onResetWish: () => {
    set({ wishlist: [] });
  },
}));
