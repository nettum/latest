export interface DiscogsResponseType {
  pagination: Pagination;
  releases: Release[];
}

interface Pagination {
  per_page: number;
  pages: number;
  page: number;
  items: number;
  urls: Urls;
}

interface Urls {
  next: string;
  last: string;
}

interface Release {
  id: number;
  instance_id: number;
  folder_id: number;
  rating: number;
  basic_information: BasicInformation;
  notes: Note[];
}

interface BasicInformation {
  id: number;
  title: string;
  year: number;
  resource_url: string;
  thumb: string;
  cover_image: string;
  formats: Format[];
  labels: Label[];
  artists: Artist[];
  genres: string[];
  styles: string[];
}

interface Format {
  qty: string;
  descriptions: string[];
  name: string;
}

interface Label {
  resource_url: string;
  entity_type: string;
  catno: string;
  id: number;
  name: string;
}

interface Artist {
  id: number;
  name: string;
  join: string;
  resource_url: string;
  anv: string;
  tracks: string;
  role: string;
}

interface Note {
  field_id: number;
  value: string;
}
