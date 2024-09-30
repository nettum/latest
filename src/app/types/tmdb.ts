export interface TMDBMovieResponseType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: unknown;
  budget: number;
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieProductionCompany[];
  production_countries: MovieProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBShowResponseType {
  adult: boolean;
  backdrop_path: string;
  created_by: ShowCreatedBy[];
  episode_run_time: unknown[];
  first_air_date: string;
  genres: ShowGenre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: ShowLastEpisodeToAir;
  name: string;
  next_episode_to_air: ShowNextEpisodeToAir;
  networks: ShowNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ShowProductionCompany[];
  production_countries: ShowProductionCountry[];
  seasons: ShowSeason[];
  spoken_languages: ShowSpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface MovieProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface MovieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface ShowCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface ShowGenre {
  id: number;
  name: string;
}

interface ShowLastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface ShowNextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: unknown;
  season_number: number;
  show_id: number;
  still_path: unknown;
}

interface ShowNetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ShowProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface ShowProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface ShowSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface ShowSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
