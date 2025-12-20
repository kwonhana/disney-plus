

// import { create } from "zustand";
// import type { Movie } from "../types/IMovie";

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


// interface KidsMovieProps {
//     kidsThemeMoive: Movie[];
//     kidsCharacterMovie: Movie[];
//     onFetchCollctionMovie: (item) => Promise<void>;
//     onFethCharacterMovie: (item) => Promise<void>;
// }

// export const useKidsMoiveStore = create<KidsMovieProps>((set) => ({

//     kidsThemeMoive: [],
//     kidsCharacterMovie: [],


//     onFetchCollctionMovie: async (item) => {
//         let url = ""

//         if (item.type === "movie" || item.type === "tv") {
//             url = `https://api.themoviedb.org/3/search/${item.type}?api_key=${API_KEY}&query=${encodeURIComponent(item.query)}&language=ko-KR`
//         }

//         if (item.type === "discover") {
//             url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${item.genres.join(',')}&language=ko-KR`;
//         }

//         if (!url) {
//             console.error("url이 비어있", item.type);
//             // console.log("item:", item, "typeof:", typeof item, "keys:", item && typeof item === "object" ? Object.keys(item) : null);
//             return;
//         }
//         const res = await fetch(url);
//         const data = await res.json();
//         console.log("디즈니", data.results)

//         let results = data.results ?? [];

//         if (
//             (item.type === "movie" || item.type === "tv" || item.type === "discover") && item.animationOnly
//         ) {
//             results = results.filter((r) => Array.isArray(r.genre_ids) && r.genre_ids.includes(16));
//         }

//         set({ kidsThemeMoive: results })


//     },

//     onFethCharacterMovie: async (item) => {
//         const res = await fetch(`https://api.themoviedb.org/3/search/${item.type}?api_key=${API_KEY}&query=${encodeURIComponent(item.query)}&language=ko-KR`)
//         const data = await res.json();
//         let results = data.results ?? [];
//         results = results.filter((r) => Array.isArray(r.genre_ids) && r.genre_ids.includes(16));
//         console.log("니모", results)

//         set({ kidsCharacterMovie: results });

//     },




// }))


import { create } from "zustand";
import type { Movie } from "../types/IMovie";
import { useProfileStore } from "./useProfileStore"; //active profile 가져오기

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface KidsMovieProps {
    kidsThemeMoive: Movie[];
    kidsCharacterMovie: Movie[];
    onFetchCollctionMovie: (item: Movie[]) => Promise<void>;
    onFethCharacterMovie: (item: Movie[]) => Promise<void>;
}

/* =======================
  NL certification -> 숫자 나이
======================= */
const nlCertToAge = (cert?: string | null) => {
    if (!cert) return null;
    const c = String(cert).trim().toUpperCase();

    if (c === "AL" || c === "ALL") return 0;

    const n = Number(c);
    if ([6, 9, 12, 14, 16, 18].includes(n)) return n;

    return null;
};

/* =======================
  현재 activeProfile 기준으로
  키즈모드 + maxAge 계산
======================= */
const getActiveProfilePolicy = () => {
    const { profiles, activeProfileId } = useProfileStore.getState();
    const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? null;

    const isKidsMode = !!activeProfile?.isKids;

    //contentLimit 값: 0,5,7,12,15,19 라고 하셨으니 그대로 maxAge로 사용
    //키즈에서 "설정 안 함"을 0으로 쓰는 경우가 많아서 12 기본 처리
    const raw = activeProfile?.contentLimit;

    const maxAge = isKidsMode
        ? (raw === 0 || raw == null ? 12 : raw) // 키즈 기본 12
        : (raw ?? 999); // 성인/일반은 제한 없으면 넉넉히

    return { activeProfile, isKidsMode, maxAge };
};

/* =======================
 Movie: NL certification 가져오기
======================= */
const fetchMovieNlCert = async (id: number | string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
    );
    const data = await res.json();

    const nl = (data?.results ?? []).find((r: any) => r.iso_3166_1 === "NL");
    const list = nl?.release_dates ?? [];

    const preferTypes = [3, 4, 5, 6, 1, 2];
    for (const t of preferTypes) {
        const found = list.find(
            (x: any) => x?.type === t && x?.certification?.trim()
        );
        if (found) return String(found.certification).trim();
    }

    const any = list.find((x: any) => x?.certification?.trim());
    return any ? String(any.certification).trim() : null;
};

/* =======================
 TV: NL rating 가져오기
======================= */
const fetchTvNlCert = async (id: number | string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}`
    );
    const data = await res.json();

    const nl = (data?.results ?? []).find((r: any) => r.iso_3166_1 === "NL");
    return nl?.rating ? String(nl.rating).trim() : null;
};

/* =======================
 상위 N개만 NL 등급 붙여서 필터
  - 키즈면 등급 없으면 숨김
======================= */
const filterByNlAgeTopN = async (
    results: Movie[],
    maxAge: number,
    isKidsMode: boolean,
    mediaType: "movie" | "tv",
    take = 20
) => {
    const head = results.slice(0, take);

    const headWithCert = await Promise.all(
        head.map(async (r) => {
            const cert =
                mediaType === "tv" ? await fetchTvNlCert(r.id) : await fetchMovieNlCert(r.id);
            return { ...r, nlCert: cert };
        })
    );

    return headWithCert.filter((r) => {
        const nlAge = nlCertToAge(r.nlCert);

        //키즈면 등급 없는 건 숨김
        if (nlAge === null) return isKidsMode ? false : true;

        return nlAge <= maxAge;
    });
};

export const useKidsMoiveStore = create<KidsMovieProps>((set) => ({
    kidsThemeMoive: [],
    kidsCharacterMovie: [],

    onFetchCollctionMovie: async (item) => {
        let url = "";

        if (item.type === "movie" || item.type === "tv") {
            url = `https://api.themoviedb.org/3/search/${item.type}?api_key=${API_KEY}&query=${encodeURIComponent(
                item.query
            )}&language=ko-KR`;
        }

        if (item.type === "discover") {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${item.genres.join(
                ","
            )}&language=ko-KR`;
        }

        if (!url) {
            console.error("url이 비어있", item.type);
            return;
        }

        const res = await fetch(url);
        const data = await res.json();
        let results = data.results ?? [];

        //기존 애니메이션 필터 유지
        if (
            (item.type === "movie" || item.type === "tv" || item.type === "discover") &&
            item.animationOnly
        ) {
            results = results.filter(
                (r: any) => Array.isArray(r.genre_ids) && r.genre_ids.includes(16)
            );
        }

        //activeProfile 기준
        const { isKidsMode, maxAge } = getActiveProfilePolicy();
        const mediaType: "movie" | "tv" = item.type === "tv" ? "tv" : "movie";

        results = await filterByNlAgeTopN(results, maxAge, isKidsMode, mediaType, 20);

        set({ kidsThemeMoive: results });
    },

    onFethCharacterMovie: async (item) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/${item.type}?api_key=${API_KEY}&query=${encodeURIComponent(
                item.query
            )}&language=ko-KR`
        );
        const data = await res.json();
        let results = data.results ?? [];

        //장르 애니메이션 필터
        results = results.filter(
            (r: any) => Array.isArray(r.genre_ids) && r.genre_ids.includes(16)
        );

        //캐릭터도 activeProfile 기준으로 동일 적용
        const { isKidsMode, maxAge } = getActiveProfilePolicy();
        const mediaType: "movie" | "tv" = item.type === "tv" ? "tv" : "movie";

        results = await filterByNlAgeTopN(results, maxAge, isKidsMode, mediaType, 20);

        set({ kidsCharacterMovie: results });
    },
}));
