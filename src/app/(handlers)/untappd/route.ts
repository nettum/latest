import { UntappdResponseType } from "@/app/types/untappd";
import { FeedItemType } from "@/app/types/feed";

export async function GET() {
  const data = await fetch(`https://api.untappd.com/v4/user/checkins/${process.env.UNTAPPD_USERNAME}?client_id=${process.env.UNTAPPD_CLIENT_ID}&client_secret=${process.env.UNTAPPD_CLIENT_SECRET}&limit=4`);
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

  const httpResponse = Response.json(response);
  httpResponse.headers.set("Cache-Control", "public, s-max-age=3600");
  return httpResponse;
}
