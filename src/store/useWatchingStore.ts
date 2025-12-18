import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { useProfileStore } from './useProfileStore';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../api/auth';
import type { WatchingItem } from '../types/IWish_Watching';

interface WatchingState {
  watching: WatchingItem[];
  onAddWatching: (item: WatchingItem) => Promise<void>;
  onRemoveWatching: (id: number) => Promise<void>;
  onResetWatching: () => void;
  onFetchWatching: () => Promise<void>;
}

export const useWatchingStore = create<WatchingState>((set, get) => ({
  // 플레이한 영화를 저장할 변수
  watching: [],

  // 사용자 별로 플레이한 리스트를 저장할 메서드
  onAddWatching: async (item) => {
    console.log('추가');
    // 1. 로그인 상태, 이미지 정보
    // 이미지 정보가 없으면 저장 안함.
    if (!item.poster_path) return;
    // 로그인 상태를 체크하기 위해 다른 전역변수 가져오기
    const user = useAuthStore.getState().user;
    if (!user) return alert('로그인 해주세요.');
    // 프로필 다른 전역 상태변수 가져오기
    const activeProfileId = useProfileStore.getState().activeProfileId;

    // 2. firebase 저장 위치 결정하기
    // users/{uid}/profiles/{activeProfileId}/playlist/{movieId}
    const ref = doc(
      db,
      'users',
      user.uid,
      'profiles',
      activeProfileId,
      'playlist',
      String(item.id)
    );

    // 3. 중복 방지
    const exists = get().watching.find((w) => w.id === item.id);
    if (exists) return;

    // 4. firestore 저장
    await setDoc(ref, {
      ...item,
      updateAt: Date.now(),
    });

    // zustand 상태 업데이트
    set({
      watching: [
        ...get().watching,
        {
          ...item,
          updateAt: Date.now(),
        },
      ],
    });
  },

  // 플레이 리스트를 삭제할 메서드
  onRemoveWatching: async (id) => {
    console.log('삭제 완료');
  },

  // 사용자 별 플레이리스트 저장목록을 불러올 메서드
  onFetchWatching: async () => {
    // 사용자가 로그인 상태인지 체크
    const user = useAuthStore.getState().user;
    // 프로필 정보
    const activeProfileId = useProfileStore.getState().activeProfileId;
    if (!user) return;

    // firestore에서 가져오기
    // users/{uid}/profiles/{activeProfileId}/watching컬렉션 가져오기
    const snap = await getDocs(
      collection(db, 'users', user.uid, 'profiles', activeProfileId, 'playlist')
    );
    // 가져온 문서르 배열로 변환시켜 watching에 저장하기
    const data = snap.docs.map((doc) => doc.data() as WatchingItem);

    // 가져온 데이터 zustand 상태 변수에 넣기
    set({ watching: data });

    console.log('가지고 오는 중');
  },

  // 사용자가 변경되면 기존 플레이 리스트 리셋
  onResetWatching: () => set({ watching: [] }),
}));
