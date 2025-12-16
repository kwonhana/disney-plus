import { create } from 'zustand';
import type { Movie, MovieState, SeasonData } from '../types/IContent';

const APT_KEY = import.meta.env.VITE_TMDB_API_KEY;

// =========================
// 연도 계산 (그대로 유지)
const createFullDateString = (dateString: string, isEnd = false): string => {
  const [month, day] = dateString.split('-').map(Number);
  let nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;

  if (nowMonth < 3 && month > 10 && month > nowMonth && !isEnd) {
    nowYear -= 1;
  }

  return `${nowYear}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// =========================
//  Store
export const useMovieStore = create<MovieState>((set, get) => ({
  //  theme 제거
  movies: [],
  themeMovies: [],
  seasonMovies: [],
  genres: [],
  category: {},
  isLoading: false,

  // =========================
  // 장르
  onFetchGenres: async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APT_KEY}&language=ko`
    );
    const data = await res.json();
    set({ genres: data.genres });
    return data.genres;
  },

  getGenreMap: async () => {
    let genres = get().genres;
    if (genres.length === 0) {
      genres = await get().onFetchGenres();
    }

    return genres.reduce((acc, cur) => {
      acc[cur.id] = cur.name;
      return acc;
    }, {} as Record<number, string>);
  },

  // =========================
  // 곧 개봉
  onFetchUpcoming: async () => {
    const genreMap = await get().getGenreMap();

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APT_KEY}&language=en-US&page=1`
    );
    const data = await res.json();

    const extra = await Promise.all(
      data.results.map(async (movie: Movie) => {
        const logoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${APT_KEY}`
        );
        const logoData = await logoRes.json();

        return {
          ...movie,
          logo: logoData.logos?.[0]?.file_path || 'none',
          genreNames: movie.genre_ids?.map((id) => genreMap[id]).filter(Boolean),
        };
      })
    );

    set({ movies: extra });
  },

  // =========================
  // 카테고리
  onfetchCate: async (genreId: number) => {
    if (get().category[genreId]) return;

    const genreMap = await get().getGenreMap();
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${APT_KEY}&language=ko&with_genres=${genreId}`
    );
    const data = await res.json();

    const mapped = data.results.map((mov: Movie) => ({
      ...mov,
      genreNames: mov.genre_ids?.map((id) => genreMap[id]).filter(Boolean),
    }));

    set((state) => ({
      category: {
        ...state.category,
        [genreId]: mapped,
      },
    }));
  },

  // =========================
  //  테마 (ThemeList 전용)
  onfetchTheme: async (companyId: string) => {
    set({ isLoading: true });

    try {
      const genreMap = await get().getGenreMap();

      const [tvRes, movieRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${APT_KEY}&language=ko-KR&with_watch_providers=${companyId}&watch_region=KR`
        ),
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${APT_KEY}&language=ko-KR&with_companies=${companyId}&watch_region=KR`
        ),
      ]);

      const tv = await tvRes.json();
      const movie = await movieRes.json();

      const merged = [...tv.results, ...movie.results].map((mov: Movie) => ({
        ...mov,
        genreNames: mov.genre_ids?.map((id) => genreMap[id]).filter(Boolean),
      }));

      //  theme  → themeMovies 
      set({ themeMovies: merged });
    } finally {
      set({ isLoading: false });
    }
  },

  // =========================
  // 시즌 (다른 컴포넌트용)
  onfetchSeason: async (seasonData: SeasonData) => {
    const genreMap = await get().getGenreMap();

    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${APT_KEY}&language=ko-KR`;

    console.log("기본", apiUrl)
    const aa = await fetch(apiUrl);
    const dd = await aa.json();
    console.log("가공", dd.results)


    // if (seasonData.keywordId) {
    //   apiUrl += `&with_keywords=${seasonData.keywordId}`;
    // }
    // if (seasonData.genreId) {
    //   apiUrl += `&with_genres=${seasonData.genreId}`;
    // }

    console.log("수정후", apiUrl)

    if (seasonData.title === 'classic') {
      apiUrl += `&primary_release_year.lte=1980`;
      apiUrl += `&sort_by=vote_average.desc`;
      apiUrl += `&vote_count.gte=500`;
    } else {
      // =========================
      //  시즌 날짜 필터
      const startDate = createFullDateString(seasonData.startDate, false);
      const endDate = createFullDateString(seasonData.endDate, true);

      apiUrl += `&primary_release_date.gte=${startDate}`;
      apiUrl += `&primary_release_date.lte=${endDate}`;
      apiUrl += `&sort_by=popularity.desc`;
    }


    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("수정후 가공", data)


    const mapped = data.results.map((mov: Movie) => ({
      ...mov,
      genreNames: mov.genre_ids?.map((id) => genreMap[id]).filter(Boolean),
    }));
    console.log("시즌안 장르", genreMap)
    console.log("시즌", seasonData, mapped)
    //  theme  → seasonMovies 
    set({ seasonMovies: mapped });
  },
}));
