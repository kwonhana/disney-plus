export interface TV {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: [];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
}

export interface DATA {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  name: string;
  first_air_date: string;
  last_air_date: string;
  overview: string;
  poster_path: string;
  episode_run_time: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ITVStore {
  UpComingTv: TV[];
  RatedTv: TV[];
  TopTV: TV[];
  onFetchNewTV: () => Promise<void>;
  onFetchRated: () => Promise<void>;
  onFetchTopTV: () => Promise<void>;
}
