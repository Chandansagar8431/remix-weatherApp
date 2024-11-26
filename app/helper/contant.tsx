export const viewKeysInUse = new Set([
  "temp_c",
  "precip_mm",
  "humidity",
  "conditionicon",
  "conditiontext",
]);
type Condition = {
  description: String;
  icon: String;
};
export type ViewTypes = {
  [key: string]: string;
};

export const valueForView: ViewTypes = {
  temp_c: "Current temperature in c",
  precip_mm: "Current precipitation",
  humidity: "Current humidity",
  conditionicon: "image of current weather",
  conditiontext: "Discription of current weather",
};
