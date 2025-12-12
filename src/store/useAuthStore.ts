import { create } from 'zustand';
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { auth, googleProvider, db } from '../api/auth';

// type 지정
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  initAuth: () => void;
  onMember: (email: string, password: string) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  onLogout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // 사용자 정보
  user: null,
  loading: true,
  error: null,

  clearError: () => set({ error: null }),

  // 로딩이 되고 나면 사용자를 user에 넣어서 사용, loading을 false로 바꾸기 => 로그인 상태
  // user 값이 바뀌면 isLogin값도 자동으로 업데이트 되게 함.
  setUser: (user) => set({ user, loading: false }),

  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  },

  // 회원가입
  onMember: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      set({ user: firebaseUser });

      alert('회원가입 성공');
      console.log('회원가입 성공');
    } catch (err) {
      alert('회원가입 실패');
      console.log('회원가입 실패', err.message);
    }
  },

  // 기본 로그인
  onLogin: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      set({ user: firebaseUser });

      alert('로그인 성공');
      console.log('로그인 성공');
    } catch (err) {
      alert('로그인 실패');
      console.log('로그인 실패', err.message);
    }
  },

  // 구글 로그인
  onGoogleLogin: async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);

      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      set({ user: firebaseUser });

      alert('구글 로그인 성공');
      console.log('구글 로그인 성공');
    } catch (err) {
      alert('구글 로그인 실패');
      console.log('구글 로그인 실패', err.message);
    }
  },

  // 로그아웃
  onLogout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));
