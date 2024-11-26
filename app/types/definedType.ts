import { Dispatch, SetStateAction } from "react";
export interface CityData {
  userId: string;
  city: any;
  postedBy: any;
}
export interface CityListProps {
  city: any | undefined;
  id: string | undefined;
  setCityWeatherInfo: Dispatch<SetStateAction<null>>;
  setShowDetails: Dispatch<SetStateAction<boolean>>;
  ciitesWeatherList: object[];
  cityWeather: object;
  setCardPosition: Dispatch<SetStateAction<Position | null>>;
}
export type RegisterForm = {
  name: string;
  password: string;
  email: string;
};
export type Position = {
  x: number;
  y: number;
};
