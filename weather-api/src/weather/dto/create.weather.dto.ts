import { Weather } from "../interfaces/weather.schema";

export interface CreateWeatherDto extends Partial<Weather> {}