export type ConcertsResponseType = Concert[];

interface Concert {
  title: string;
  slug: string;
  concertImage: ConcertImage;
  concertDate: string;
  venue: string;
  event: string | null;
}

interface ConcertImage {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}
