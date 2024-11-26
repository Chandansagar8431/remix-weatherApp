export const viewKeysInUse = new Set([
  "temp_c",
  // "is_day",
  // "wind_kph",
  // "wind_degree",
  // "wind_dir",
  // "pressure_in",
  "precip_mm",
  "humidity",
  // "cloud",
  // "feelslike_c",
  // "windchill_c",
  // "heatindex_c",
  // "vis_km",
  // "uv",
  // "gust_kph",
  "conditionicon",
  "conditiontext",
]);
type Condition = {
  description: String;
  icon: String;
};
export type ViewTypes = {
  [key: string]: string;

  // temp_c: string;
  // //   is_day: string;
  // //   wind_kph: string;
  // //   wind_degree: string;
  // //   wind_dir: string;
  // //   pressure_in: string;
  // precip_in: string;
  // humidity: string;
  // //   cloud: string;
  // //   feelslike_c: string;
  // //   windchill_c: string;
  // //   heatindex_c: string;
  // //   dewpoint_c: string;
  // //   vis_km: string;
  // //   uv: string;
  // //   gust_kph: string;
  // condition: Condition;
};

export const valueForView: ViewTypes = {
  temp_c: "Current temperature in c",
  // is_day: "Day / Night",
  // wind_kph: "wind spped",
  // wind_degree: "Wind degree",
  // wind_dir: "Wind direction",
  // pressure_in: "Atm pressure",
  precip_mm: "Current precipitation",
  humidity: "Current humidity",
  // cloud: "Cloud",
  // feelslike_c: "Feels like",
  // windchill_c: "Wind chill",
  // heatindex_c: "Heat index",
  // dewpoint_c: "Dew point",
  // vis_km: "Visibility",
  // uv: "UV index",
  // gust_kph: "Wind gusts",
  conditionicon: "image of current weather",
  conditiontext: "Discription of current weather",
  // condition: "condition",
};
