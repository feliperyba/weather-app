import express from "express";
import { body } from "express-validator";
import JwtMiddleware from "../auth/middlewares/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { PermissionLevel } from "../common/enums/common.permissionLevel.enum";
import BodyValidationMiddleware from "../common/middlewares/body.validation.middleware";
import PermissionMiddleware from "../common/middlewares/common.permision.middleware";
import WeatherController from "./controllers/weather.controller";
import WeatherMiddleware from "./middlewares/weather.middleware";

export class WeatherRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "WeatherRoutes");
    }

    configRoutes() {
        this.configDefault();
        this.configIdPath();
        this.configCityPath();

        return this.app;
    }

    configDefault() {
        this.app
            .route(`/weather`)
            .post(
                JwtMiddleware.validJWTNeeded,
                PermissionMiddleware.minimumPermissionLevelRequired(
                    PermissionLevel.ADMIN_PERMISSION
                ),
                body("date")
                    .notEmpty()
                    .isDate()
                    .withMessage("Date must be provided"),
                body("location")
                    .notEmpty()
                    .isObject()
                    .withMessage("Location must be provided"),
                body("location.city")
                    .notEmpty()
                    .isString()
                    .withMessage("City must be provided"),
                body("location.country")
                    .notEmpty()
                    .isString()
                    .withMessage("Country must be provided"),
                body("forecast")
                    .notEmpty()
                    .isNumeric()
                    .withMessage("Forecast must be provided"),
                body("hourly_temperature")
                    .notEmpty()
                    .isArray()
                    .withMessage("Hourly temperature must be provided"),
                WeatherMiddleware.validateSameCityDateDoesntExist,
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                WeatherController.create
            );
    }

    configIdPath() {
        this.app.param(`weatherId`, WeatherMiddleware.extractId);
        this.app
            .route(`/weather/:weatherId`)
            .all(WeatherMiddleware.validateWeatherExists)
            .get(WeatherController.getWeatherById)

        this.app.put(`/weather/:weatherId`, [
            JwtMiddleware.validJWTNeeded,
            PermissionMiddleware.minimumPermissionLevelRequired(
                PermissionLevel.ADMIN_PERMISSION
            ),
            body("date")
                .notEmpty()
                .isDate()
                .withMessage("Date must be provided"),
            body("location")
                .notEmpty()
                .isObject()
                .withMessage("Location must be provided"),
            body("location.city")
                .notEmpty()
                .isString()
                .withMessage("City must be provided"),
            body("location.country")
                .notEmpty()
                .isString()
                .withMessage("Country must be provided"),
            body("forecast")
                .notEmpty()
                .isNumeric()
                .withMessage("Forecast must be provided"),
            body("hourly_temperature")
                .notEmpty()
                .isArray()
                .withMessage("Hourly temperature must be provided"),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            WeatherController.put
        ]);

        this.app.patch(`/weather/:weatherId`, [
            JwtMiddleware.validJWTNeeded,
            PermissionMiddleware.minimumPermissionLevelRequired(
                PermissionLevel.ADMIN_PERMISSION
            ),
            body("date")
                .notEmpty()
                .isDate()
                .withMessage("Date must be provided")
                .optional(),
            body("location")
                .notEmpty()
                .isObject()
                .withMessage("Location must be provided")
                .optional(),
            body("location.city")
                .notEmpty()
                .isString()
                .withMessage("City must be provided")
                .optional(),
            body("location.country")
                .notEmpty()
                .isString()
                .withMessage("Country must be provided")
                .optional(),
            body("forecast")
                .notEmpty()
                .isNumeric()
                .withMessage("Forecast must be provided")
                .optional(),
            body("hourly_temperature")
                .notEmpty()
                .isArray()
                .withMessage("Hourly temperature must be provided")
                .optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            WeatherMiddleware.validateSameCityDateDoesntExist,
            WeatherController.patch,
        ]);

        this.app.delete(`/weather/:weatherId`, [
            JwtMiddleware.validJWTNeeded,
            PermissionMiddleware.minimumPermissionLevelRequired(
                PermissionLevel.ADMIN_PERMISSION
            ),
            WeatherController.remove,
        ]);
    }

    configCityPath() {
        this.app.param(`city`, WeatherMiddleware.extractCity);
        this.app
            .route(`/weather/city/:city`)
            .get(
                body("daysRange")
                    .notEmpty()
                    .isNumeric()
                    .withMessage("Days range must be provided")
                    .optional(),
                WeatherController.getWeatherByCity
            );

        this.app.param(`date`, WeatherMiddleware.extractDate);
        this.app
            .route(`/weather/city/:city/:date`)
            .get(WeatherController.getWeatherByCityDate);
    }
}
