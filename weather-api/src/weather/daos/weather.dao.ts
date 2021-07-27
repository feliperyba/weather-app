import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateWeatherDto } from "../dto/create.weather.dto";
import { PatchWeatherDto } from "../dto/patch.weather.dto";
import { PutWeatherDto } from "../dto/put.weather.dto";

const logger: debug.IDebugger = debug("weather-api:mongoose-weather-dao");

class WeatherDao {
    public Schema = mongooseService.getMongoose().Schema;
    public weatherSchema = new this.Schema({
        _id: String,
        date: String,
        location: Object,
        forecast: Number,
        hourly_temperature: Array
    }, { id: false });
    public Weather = mongooseService.getMongoose().model("Weather", this.weatherSchema);

    constructor() {
        logger("Created new instance of WeatherDao");
    }

    async getWeatherById(weatherId: string) {
        return this.Weather.findOne({ _id: weatherId }).exec();
    }

    async getWeatherByCity(city: string, daysRange: number) {
        return this.Weather
            .find({ "location.city": city })
            .sort({ date: -1 })
            .limit(daysRange)
            .exec();
    }

    async getWeatherByCityDate(city: string, date: string) {
        return this.Weather
            .findOne({ "location.city": city, date: date })
            .exec();
    }

    async addWeather(weatherForm: CreateWeatherDto) {
        const weatherId = shortid.generate();
        const weather = new this.Weather({
            _id: weatherId,
            ...weatherForm
        });
        await weather.save();

        return weatherId;
    }

    async updateWeatherById(
        weatherId: string,
        weatherForm: PatchWeatherDto | PutWeatherDto
    ) {
        await this.Weather
            .findOneAndUpdate(
                { _id: weatherId },
                { $set: weatherForm },
                { new: true }
            ).exec();

        return `Update done for ${weatherId}`;
    }

    async removeWeatherById(weatherId: string) {
        this.Weather
            .deleteOne({ _id: weatherId })
            .exec();

        return `${weatherId} Removed`;
    }
}

export default new WeatherDao();