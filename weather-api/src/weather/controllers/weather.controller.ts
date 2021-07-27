import debug from "debug";
import express from "express";
import WeatherService from "../services/weather.service";

const logger: debug.IDebugger = debug("weather-api:weather-controller");

class WeatherController {
    async getWeatherById(req: express.Request, res: express.Response) {
        const weather = await WeatherService.readById(req.body.weatherId);
        res.status(200).send(weather);
    }

    async getWeatherByCity(req: express.Request, res: express.Response) {
        const weather = await WeatherService.readByCity(req.body.city, req.body.daysRange);
        if (weather && weather.length > 0) {
            res.status(200).send(weather);
        } else {
            res.status(404).send("No results found");
        }
    }

    async getWeatherByCityDate(req: express.Request, res: express.Response) {
        const weather = await WeatherService.readByCityDate(req.body.city, req.body.date);
        if (weather) {
            res.status(200).send(weather);
        } else {
            res.status(404).send("No results found");
        }

    }

    async create(req: express.Request, res: express.Response) {
        const weatherId = await WeatherService.create(req.body);
        res.status(201).send({ id: weatherId });
    }

    async patch(req: express.Request, res: express.Response) {
        logger(await WeatherService.patchById(req.body.weatherId, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        logger(await WeatherService.putById(req.body.weatherId, req.body));
        res.status(204).send();
    }

    async remove(req: express.Request, res: express.Response) {
        logger(await WeatherService.deleteById(req.body.weatherId));
        res.status(204).send();
    }

}

export default new WeatherController();