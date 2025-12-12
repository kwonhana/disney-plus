// TODO 주니어 모드 나이 설정 store
import { create } from 'zustand';

// TODO 생년월일 배열 만들기
// 만 나이 기준
export const useKidsStore = create((set) => ({
  // 주니어 해당 연도를 저장할 배열
  years: [],
  // 월을 저장할 배열
  months: [],
  // 날짜를 저장할 배열
  date: [],

  // 만 나이 기준 0 - 12세 출생 연도 배열 만들기
  initYears: () => {
    // 최대 연령 지정하기
    const maxAge = 12;
    // 현재 년도 추출하기
    const thisYear = new Date().getFullYear();
    // 최대 연령 해당 연도 구하기 만 12세
    const startYear = thisYear - maxAge;
    // 가장 어린 출생 연도 만 0세
    const endYear = thisYear;

    // TODO 배열의 길이 계산
    // 'Array.from'은 필수적으로 배열의 길이가 필요
    // 미리 빈 배열을 만들고 채우는 방식
    // Array.from + map 방식 => “상자를 필요한 개 수만큼 미리 만든 후, 값을 하나씩 채우는 방식”
    const length = endYear - startYear + 1;

    //
    const yearsArray = Array.from({ length }, (_, id) => endYear - id);

    set({ years: yearsArray });
  },

  // 1 - 12월 월 배열 만들기
  initMonth: () => {
    // padStart(2,"0") => 문자열 길이가 2가 되도록 왼쪽에 "0"을 채워주는 메서드.
    const monthArray = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    set({ months: monthArray });
  },

  // 월별 날짜 배열 만들기
  initDate: () => {
    const dateArray = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
    set({ date: dateArray });
  },
}));
