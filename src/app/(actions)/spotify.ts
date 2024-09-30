"use server";

import { FeedItemType } from "@/app/types/feed";
import { SpotifyTokenResponseType, SpotifyResponseType } from "@/app/types/spotify";

let accessToken: SpotifyTokenResponseType | null = null;
let expireTS = 0;

const cacheTTL = 300;
let cache = {
  expireTS: 0,
  data: [] as FeedItemType[],
};

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
  accessToken = json;
  expireTS = Date.now() + json.expires_in * 1000;
  return json;
};

export async function getData() {
  if (cache.data.length > 0 && Date.now() < cache.expireTS) {
    return cache.data;
  }

  if (!accessToken || Date.now() >= expireTS) {
    accessToken = await getAccessToken();
    expireTS = Date.now() + accessToken.expires_in * 1000;
  }

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

  cache = {
    expireTS: Date.now() + cacheTTL * 1000,
    data: response,
  };

  return response;
}
