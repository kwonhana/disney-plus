// TODO Auth Typemn
import type { User } from 'firebase/auth';

// 키즈모드 상태 체크
export interface KidsModeInfo {
  isActive: boolean;
  year: number | null;
  month: number | null;
  date: number | null;
}

// 사용자 추가 정보 타입
export interface UserData {
  uid: string;
  name: string;
  phone: string;
  email: string;
  nickname: string;
  file: string;
  profile: string;
  createdAt: Date;
  kidsMode?: KidsModeInfo;
}

// TODO Auth Store 상태타입
export interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isLogin: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  initAuth: () => void;
  onMember: (email: string, password: string, kidsMode: KidsModeInfo) => Promise<void>;
  onLogin: (email: string, password: string) => Promise<void>;
  onGoogleLogin: (kidsMode?: KidsModeInfo) => Promise<void>;
  onLogout: () => Promise<void>;
  updateKidsMode: (kidsMode: KidsModeInfo) => Promise<void>;
  clearError: () => void;
}

export interface KidsStoreState {
  years: number[];
  months: string[];
  date: string[];

  selectedYear: number | null;
  selectedMonth: number | null;
  selectedDate: number | null;

  isKidsModeActive: boolean;

  initYears: () => void;
  initMonth: () => void;
  initDate: () => void;

  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedDate: (date: number) => void;
}
