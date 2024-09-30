import { FeedItemType } from "@/app/types/feed";
import { SpotifyTokenResponseType, SpotifyResponseType } from "@/app/types/spotify";

export const dynamic = "force-dynamic";

const getAccessToken = async () => {
  const baseAuthToken = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${baseAuthToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  const json: SpotifyTokenResponseType = await response.json();
  return json;
};

export async function GET() {
  const accessToken = await getAccessToken();
  const data = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
    cache: "no-store",
  });
  const json: SpotifyResponseType = await data.json();
  const response: FeedItemType[] = json.items.slice(0, 4).map((item) => {
    let poster = "/missing-image.png";
    if (item.track.album.images[0]) {
      poster = item.track.album.images[0].url;
    }
    return {
      id: item.track.id,
      title: item.track.name,
      subtitle: item.track.artists[0].name,
      link: item.track.external_urls.spotify,
      poster: poster,
    };
  });
  const httpResponse = Response.json(response);
  httpResponse.headers.set("CDN-Cache-Control", "max-age=300");
  return httpResponse;
}
