"use server";

import { FeedItemType } from "@/app/types/feed";
import { StravaTokenResponseType, StravaResponseType, SportType } from "@/app/types/strava";
import { secondsToHumanReadable } from "@/app/utils/time";

let accessToken: StravaTokenResponseType;
let expireTS = 0;

const cacheTTL = 3600;
let cache = {
  expireTS: 0,
  data: [] as FeedItemType[],
};

const getAccessToken = async () => {
  const refreshToken = accessToken?.refresh_token || process.env.STRAVA_REFRESH_TOKEN;
  const body = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID!,
    client_secret: process.env.STRAVA_CLIENT_SECRET!,
    grant_type: "refresh_token",
    refresh_token: refreshToken!,
  });

  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  const json: StravaTokenResponseType = await response.json();
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

  const data = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=4", {
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`,
    },
    cache: "no-store",
  });
  const json: StravaResponseType = await data.json();

  const response: FeedItemType[] = json.map((item) => {
    let poster = "/missing-image.png";
    if (item.map.summary_polyline) {
      poster = item.map.summary_polyline as string;
    }
    const types = {
      Ride: "🚴",
      Run: "🏃‍♂️",
      Walk: "🚶‍♂️",
    } as Record<SportType, string>;

    return {
      id: item.id,
      title: `${types[item.sport_type] || "💦"} ${item.name}`,
      subtitle: `${(item.distance / 1000).toFixed(2)} km, ${secondsToHumanReadable(item.moving_time)}`,
      link: `https://www.strava.com/activities/${item.id}`,
      poster: poster,
    };
  });

  cache = {
    expireTS: Date.now() + cacheTTL * 1000,
    data: response,
  };

  return response;
}
