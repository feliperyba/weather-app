import express from "express";
import WeatherService from "../services/weather.service";

class WeatherMiddleware {
    async validateWeatherExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const weather = await WeatherService.readById(req.params.weatherId);
        if (weather) {
            res.locals.weather = weather;
            next();
        } else {
            res.status(404).send(
                {
                    error: `Weather ${req.params.weatherId} not found`,
                }
            );
        }
    }

    async validateSameCityDateDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const weather = await WeatherService.readByCityDate(req.body.location.city, req.body.date);
        if (weather) {
            res.status(400).send(
                {
                    errors: ["City already have weather data for this date"]
                }
            );
        } else {
            next();
        }
    }

    async extractId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.weatherId = req.params.weatherId;
        next();
    }

    async extractCity(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.city = req.params.city;
        next();
    }

    async extractDate(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.date = req.params.date;
        next();
    }
}

export default new WeatherMiddleware();