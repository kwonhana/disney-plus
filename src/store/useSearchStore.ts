import { create } from 'zustand';
import { disney } from '../api/data'; // 5만 줄의 로컬 데이터
import type { LocalContentItem } from '../types/IContentTypes';

interface SearchState {
  searchResults: LocalContentItem[]; // 필터링된 원본 로컬 데이터 배열
  searchWord: string;
  selectedFilter: number | null;
  selectedGenreId: number | null;
  setSelectedFilter: (filter: number) => void;
  clearSelectedFilter: () => void;
  setSearchWord: (keyword: string) => void;
  clearSearch: () => void;
  onSearch: (keyword: string) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // 1. 상태
  searchResults: [],
  searchWord: '',
  selectedFilter: null,
  selectedGenreId: null,

  // 2. 필터 관련 함수
  setSelectedFilter: (filter: number) => {
    set({ selectedFilter: filter, selectedGenreId: filter });
    // 필터가 바뀌면 현재 검색어로 다시 검색을 실행하여 결과 갱신
    const currentWord = get().searchWord;
    if (currentWord) get().onSearch(currentWord);
  },

  clearSelectedFilter: () => {
    set({ selectedFilter: null, selectedGenreId: null });
    const currentWord = get().searchWord;
    if (currentWord) get().onSearch(currentWord);
  },

  // 3. 검색 상태 함수
  setSearchWord: (keyword: string) => set({ searchWord: keyword }),

  clearSearch: () =>
    set({
      searchWord: '',
      searchResults: [],
      selectedFilter: null,
      selectedGenreId: null,
    }),

  // 4. 메인 검색 로직
  // ... (상태 정의 부분 생략)

  onSearch: (keyword: string) => {
    if (!keyword.trim()) {
      set({ searchResults: [], searchWord: keyword });
      return;
    }

    set({ searchWord: keyword });

    const results = disney.filter((item) => {
      // ⭐ 핵심 수정: media_type이 아니라 이미지 속 데이터인 category를 사용해야 합니다.
      const isMovie = item.category === 'movie';
      const title = isMovie ? (item as any).title : (item as any).name;

      const titleMatch = title?.toLowerCase().includes(keyword.toLowerCase());
      const genreMatch = item.genre_title?.some((g: string) =>
        g.toLowerCase().includes(keyword.toLowerCase())
      );

      const selectedId = get().selectedGenreId;
      const genreIdMatch = selectedId ? item.genre_ids.includes(selectedId) : true;

      return (titleMatch || genreMatch) && genreIdMatch;
    });

    console.log('검색 결과 수:', results.length);
    set({ searchResults: results.slice(0, 100) });
  },
}));
