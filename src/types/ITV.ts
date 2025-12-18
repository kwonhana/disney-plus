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
  logo: string;
  release_date: string;
  title: string;
  production_companies: Company[];
  networks: Company[];
  seasons: seasons[];
  belongs_to_collection: belongs;
}

export interface Company {
  air_date: string;
  id: number;
  name: string;
  poster_path: string;
}
export interface belongs {
  backdrop_path: string;
  name: string;
  poster_path: string;
  id: number;
}
export interface seasons {
  name: string;
  poster_path: string;
  id: number;
  air_date: string;
}

export interface Videos {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
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
