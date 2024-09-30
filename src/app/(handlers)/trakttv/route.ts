import { FeedItemType } from "@/app/types/feed";
import { TraktTvType } from "@/app/types/trakttv";
import { TMDBShowResponseType } from "@/app/types/tmdb";

export async function GET() {
  const data = await fetch(`https://api.trakt.tv/users/${process.env.TRAKT_USERNAME}/history/episodes/?page=1&limit=4`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": "2",
      "trakt-api-key": process.env.TRAKT_CLIENT_ID!,
    },
  });
  const json: TraktTvType = await data.json();
  const response: FeedItemType[] = await Promise.all(
    json.map(async (item) => {
      let poster = "/missing-image.png";
      if (item.show.ids.imdb) {
        const tmdbResponse = await fetch(`https://api.themoviedb.org/3/tv/${item.show.ids.tmdb}?api_key=${process.env.TMDB_API_KEY}`);
        const tmdbJson: TMDBShowResponseType = await tmdbResponse.json();
        if (tmdbJson.poster_path) {
          poster = `https://image.tmdb.org/t/p/w500${tmdbJson.poster_path}`;
        }
      }
      const season = `${item.episode.season.toString().length === 1 ? "0" : ""}${item.episode.season}`;
      const epsiode = `${item.episode.number.toString().length === 1 ? "0" : ""}${item.episode.number}`;
      return {
        id: item.id,
        title: `${season}x${epsiode} - ${item.episode.title}`,
        subtitle: item.show.title,
        link: `https://trakt.tv/shows/${item.show.ids.slug}/seasons/${item.episode.season}/episodes/${item.episode.number}`,
        poster: poster,
      };
    })
  );
  const httpResponse = Response.json(response);
  httpResponse.headers.set("Cache-Control", "public, s-max-age=3600");
  return httpResponse;
}
