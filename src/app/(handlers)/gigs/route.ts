import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { FeedItemType } from "@/app/types/feed";
import { ConcertsResponseType } from "@/app/types/concerts";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-10",
  token: "",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

const query = `
  *[_type == "gig" && concertDate <= now()]|order(concertDate desc) {
  title,
  "slug": slug.current,
  concertImage,
  concertDate,
  "venue": venue->name,
  "event": event->name
  }[0...4]
`;

export async function GET() {
  const data: ConcertsResponseType = await client.fetch(query);
  const response: FeedItemType[] = data.map((item) => {
    let poster = "/missing-image.png";
    if (item.concertImage) {
      poster = builder.image(item.concertImage).width(400).url();
    }
    return {
      id: item.slug,
      title: item.title,
      subtitle: item.event ? `${item.event}, ${item.venue}` : item.venue,
      link: "https://gigs.internettum.no/",
      poster: poster,
    };
  });
  const httpResponse = Response.json(response);
  httpResponse.headers.set("Cache-Control", "public, s-max-age=3600");
  return httpResponse;
}
