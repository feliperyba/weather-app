import { ServiceOperations } from "../../common/interfaces/service.operations.interface";
import WeatherDao from "../daos/weather.dao";
import { CreateWeatherDto } from "../dto/create.weather.dto";
import { PatchWeatherDto } from "../dto/patch.weather.dto";
import { PutWeatherDto } from "../dto/put.weather.dto";

class WeatherService implements ServiceOperations<any, PutWeatherDto, PatchWeatherDto>{
    async readById(id: string) {
        return WeatherDao.getWeatherById(id);
    }

    async readByCity(city: string, daysRange = 7) {
        return WeatherDao.getWeatherByCity(city, daysRange);
    }

    async readByCityDate(city: string, date: string) {
        return WeatherDao.getWeatherByCityDate(city, date);
    }

    async create(resource: CreateWeatherDto) {
        return WeatherDao.addWeather(resource);
    }

    async putById(id: string, resource: PutWeatherDto) {
        return WeatherDao.updateWeatherById(id, resource);
    }

    async patchById(id: string, resource: PatchWeatherDto) {
        return WeatherDao.updateWeatherById(id, resource);
    }

    async deleteById(id: string) {
        return WeatherDao.removeWeatherById(id);
    }
}

export default new WeatherService();