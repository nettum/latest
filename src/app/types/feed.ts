export type FeedItemType = {
  id: string | number;
  title: string;
  subtitle: string;
  link: string;
  poster: string;
};

export type FeedType = "discogs" | "trakttv" | "traktmovies" | "spotify" | "gigs" | "untappd" | "strava";
