export type StravaTokenResponseType = {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
};

export type StravaResponseType = Activity[];

interface Activity {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: SportType;
  workout_type: unknown;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng: unknown;
  end_latlng: unknown;
  location_city: unknown;
  location_state: unknown;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id: string;
  from_accepted_tag: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

interface Athlete {
  id: number;
  resource_state: number;
}

interface Map {
  id: string;
  summary_polyline: unknown;
  resource_state: number;
}

export type SportType = "AlpineSki" | "BackcountrySki" | "Badminton" | "Canoeing" | "Crossfit" | "EBikeRide" | "Elliptical" | "EMountainBikeRide" | "Golf" | "GravelRide" | "Handcycle" | "HighIntensityIntervalTraining" | "Hike" | "IceSkate" | "InlineSkate" | "Kayaking" | "Kitesurf" | "MountainBikeRide" | "NordicSki" | "Pickleball" | "Pilates" | "Racquetball" | "Ride" | "RockClimbing" | "RollerSki" | "Rowing" | "Run" | "Sail" | "Skateboard" | "Snowboard" | "Snowshoe" | "Soccer" | "Squash" | "StairStepper" | "StandUpPaddling" | "Surfing" | "Swim" | "TableTennis" | "Tennis" | "TrailRun" | "Velomobile" | "VirtualRide" | "VirtualRow" | "VirtualRun" | "Walk" | "WeightTraining" | "Wheelchair" | "Windsurf" | "Workout" | "Yoga";
