export interface TV {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  genre_ids: number[];
}

export interface useTvStore {
  TopTv: TV[];
  onFetchTopTV: () => Promise<[]>;
}
