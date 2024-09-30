"use server";

import { FeedItemType } from "@/app/types/feed";
import { DiscogsResponseType } from "@/app/types/discogs";

const cacheTTL = 3600;
let cache = {
  expireTS: 0,
  data: [] as FeedItemType[],
};

export async function getData() {
  if (cache.data.length > 0 && Date.now() < cache.expireTS) {
    return cache.data;
  }

  const data = await fetch(`https://api.discogs.com/users/${process.env.DISCOGS_USERNAME}/collection/folders/1/releases?per_page=4&sort=added&sort_order=desc&token=${process.env.DISCOGS_TOKEN}`, {
    cache: "no-store",
  });
  const json: DiscogsResponseType = await data.json();
  const response: FeedItemType[] = json.releases.map((item) => {
    let poster = "/missing-image.png";
    const image = item.basic_information.cover_image;
    if (image && !image.includes("spacer.gif")) {
      poster = item.basic_information.cover_image;
    }
    return {
      id: item.basic_information.id,
      title: item.basic_information.title,
      subtitle: item.basic_information.artists[0].name.replace(/\(\d+\)$/, ""),
      link: `https://www.discogs.com/release/${item.basic_information.id}`,
      poster: poster,
    };
  });

  cache = {
    expireTS: Date.now() + cacheTTL * 1000,
    data: response,
  };

  return response;
}
