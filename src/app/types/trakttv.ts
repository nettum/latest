export type TraktMovieType = MovieEntry[];
export type TraktTvType = TvEntry[];

interface MovieEntry {
  id: number;
  watched_at: string;
  action: string;
  type: string;
  movie: Movie;
}

interface Movie {
  title: string;
  year: number;
  ids: MovieIds;
}

interface MovieIds {
  trakt: number;
  slug: string;
  imdb: string;
  tmdb: number;
}

interface TvEntry {
  id: number;
  watched_at: string;
  action: string;
  type: string;
  episode: TvEpisode;
  show: TvShow;
}

interface TvEpisode {
  season: number;
  number: number;
  title: string;
  ids: TvIds;
}

interface TvIds {
  trakt: number;
  tvdb: number;
  imdb: string;
  tmdb: number;
  tvrage: unknown;
}

interface TvShow {
  title: string;
  year: number;
  ids: TvShowIds;
}

interface TvShowIds {
  trakt: number;
  slug: string;
  tvdb: number;
  imdb: string;
  tmdb: number;
  tvrage: unknown;
}
