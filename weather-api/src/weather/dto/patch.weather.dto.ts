import { Weather } from "../interfaces/weather.schema";

export interface PatchWeatherDto extends Partial<Weather>{ }