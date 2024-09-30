import { FeedItemType } from "@/app/types/feed";
import { TraktMovieType } from "@/app/types/trakttv";
import { TMDBMovieResponseType } from "@/app/types/tmdb";

export async function GET() {
  const data = await fetch(`https://api.trakt.tv/users/${process.env.TRAKT_USERNAME}/history/movies/?page=1&limit=4`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.TRAKT_CLIENT_ID!,
    },
  });
  const json: TraktMovieType = await data.json();
  const response: FeedItemType[] = await Promise.all(
    json.map(async (item) => {
      let poster = "/missing-image.png";
      if (item.movie.ids.imdb) {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${item.movie.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`);
        const tmdbJson: TMDBMovieResponseType = await tmdbResponse.json();
        if (tmdbJson.poster_path) {
          poster = `https://image.tmdb.org/t/p/w500${tmdbJson.poster_path}`;
        }
      }
      return {
        id: item.id,
        title: item.movie.title,
        subtitle: item.movie.year.toString(),
        link: `https://trakt.tv/movies/${item.movie.ids.slug}`,
        poster: poster,
      };
    })
  );
  const httpResponse = Response.json(response);
  httpResponse.headers.set("Cache-Control", "public, s-max-age=3600");
  return httpResponse;
}
