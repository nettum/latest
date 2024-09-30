export interface UntappdResponseType {
  meta: Meta;
  notifications: unknown[];
  response: Response;
}

interface Meta {
  code: number;
  response_time: ResponseTime;
  init_time: InitTime;
}

interface ResponseTime {
  time: number;
  measure: string;
}

interface InitTime {
  time: number;
  measure: string;
}

interface Response {
  pagination: Pagination;
  checkins: Checkins;
}

interface Pagination {
  since_url: string;
  next_url: string;
  max_id: number;
}

interface Checkins {
  count: number;
  items: Item[];
}

interface Item {
  checkin_id: number;
  created_at: string;
  checkin_comment: string;
  rating_score: number;
  user: User;
  beer: Beer;
  brewery: Brewery;
  venue: Venue;
  comments: Comments;
  toasts: Toasts;
  media: Media;
  source: Source;
  badges: Badges;
}

interface User {
  uid: number;
  user_name: string;
  first_name: string;
  last_name: string;
  location: string;
  is_supporter: number;
  url: string;
  bio: string;
  relationship: unknown;
  user_avatar: string;
  is_private: number;
  public_toasts: number;
  contact: unknown[];
}

interface Beer {
  bid: number;
  beer_name: string;
  beer_label: string;
  beer_style: string;
  beer_slug: string;
  beer_abv: number;
  beer_active: number;
  has_had: boolean;
}

interface Brewery {
  brewery_id: number;
  brewery_name: string;
  brewery_slug: string;
  brewery_page_url: string;
  brewery_type: string;
  brewery_label: string;
  country_name: string;
  contact: Contact;
  location: Location;
  brewery_active: number;
}

interface Contact {
  twitter: string;
  facebook: string;
  instagram: string;
  url: string;
}

interface Location {
  brewery_city: string;
  brewery_state: string;
  lat: number;
  lng: number;
}

interface Venue {
  venue_id: number;
  venue_name: string;
  venue_slug: string;
  primary_category_key: string;
  primary_category: string;
  parent_category_id: string;
  categories: Categories;
  location: Location2;
  contact: Contact2;
  foursquare: Foursquare;
  venue_icon: VenueIcon;
  is_verified: boolean;
  spotlights: unknown[];
  has_beer: boolean;
  has_food: boolean;
  has_wine: boolean;
  has_spirits: boolean;
}

interface Categories {
  count: number;
  items: Item2[];
}

interface Item2 {
  category_key: string;
  category_name: string;
  category_id: string;
  is_primary: boolean;
}

interface Location2 {
  venue_address: string;
  venue_city: string;
  venue_state: string;
  venue_country: string;
  lat: number;
  lng: number;
}

interface Contact2 {
  twitter: string;
  venue_url: string;
}

interface Foursquare {
  foursquare_id: string;
  foursquare_url: string;
}

interface VenueIcon {
  sm: string;
  md: string;
  lg: string;
}

interface Comments {
  total_count: number;
  count: number;
  items: unknown[];
}

interface Toasts {
  total_count: number;
  count: number;
  auth_toast?: boolean;
  items: Item3[];
}

interface Item3 {
  uid: number;
  user: User2;
  like_id: number;
  like_owner: boolean;
  created_at: string;
}

interface User2 {
  uid: number;
  user_name: string;
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  relationship: string;
  user_avatar: string;
  account_type: string;
  venue_details: unknown[];
  brewery_details: unknown[];
}

interface Media {
  count: number;
  items: Item4[];
}

interface Item4 {
  photo_id: number;
  photo: Photo;
}

interface Photo {
  photo_img_sm: string;
  photo_img_md: string;
  photo_img_lg: string;
  photo_img_og: string;
}

interface Source {
  app_name: string;
  app_website: string;
}

interface Badges {
  count: number;
  items: Item5[];
  retro_status?: boolean;
}

interface Item5 {
  badge_id: number;
  user_badge_id: number;
  badge_name: string;
  badge_description: string;
  created_at: string;
  badge_image: BadgeImage;
}

interface BadgeImage {
  sm: string;
  md: string;
  lg: string;
}
