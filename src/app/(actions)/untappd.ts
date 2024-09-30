"use server";

import { UntappdResponseType } from "@/app/types/untappd";
import { FeedItemType } from "@/app/types/feed";

const cacheTTL = 3600;
let cache = {
  expireTS: 0,
  data: [] as FeedItemType[],
};

export async function getData() {
  if (cache.data.length > 0 && Date.now() < cache.expireTS) {
    return cache.data;
  }

  const data = await fetch(`https://api.untappd.com/v4/user/checkins/${process.env.UNTAPPD_USERNAME}?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&limit=4`, {
    cache: "no-store",
  });
  const json: UntappdResponseType = await data.json();

  const response: FeedItemType[] = json.response.checkins.items.map((item) => {
    let poster = "/missing-image.png";
    if (item.media.count > 0) {
      poster = item.media.items[0].photo.photo_img_md;
    }
    return {
      id: item.checkin_id,
      title: item.beer.beer_name,
      subtitle: item.brewery.brewery_name,
      link: `https://untappd.com/user/internettum/checkin/${item.checkin_id}`,
      poster: poster,
    };
  });

  cache = {
    expireTS: Date.now() + cacheTTL * 1000,
    data: response,
  };

  return response;
}
