import { CommonRoutesConfig } from "../common/common.routes.config";
import authController from "./controllers/auth.controller";
import authMiddleware from "./middlewares/auth.middleware";
import express from "express";
import BodyValidationMiddleware from "../common/middlewares/body.validation.middleware";
import { body } from "express-validator";
import JwtMiddleware from "./middlewares/jwt.middleware";

export class AuthRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "AuthRoutes");
    }

    configRoutes(): express.Application {
        this.app.post(`/auth`, [
            body("login").isString(),
            body("password").isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            authMiddleware.verifyUserPassword,
            authController.createJWT,
        ]);

        this.app.post(`/auth/refresh-token`, [
            JwtMiddleware.validJWTNeeded,
            JwtMiddleware.verifyRefreshBodyField,
            JwtMiddleware.validRefreshNeeded,
            authController.createJWT,
        ]);

        return this.app;
    }
}