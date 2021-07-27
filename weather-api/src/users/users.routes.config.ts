import express from "express";
import { body } from "express-validator";
import JwtMiddleware from "../auth/middlewares/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { PermissionLevel } from "../common/enums/common.permissionLevel.enum";
import BodyValidationMiddleware from "../common/middlewares/body.validation.middleware";
import PermissionMiddleware from "../common/middlewares/common.permision.middleware";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middlewares/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "UsersRoutes");
    }

    configRoutes() {
        this.configDefault();
        this.configIdPath();

        return this.app;
    }

    configDefault() {
        this.app
            .route(`/users`)
            .post(
                body("login")
                    .isLength({ min: 5 })
                    .withMessage("Login must have 5+ characters"),
                body("password")
                    .isLength({ min: 8 })
                    .withMessage("Password must have 8+ characters"),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameLoginDoesntExist,
                UsersController.create
            );
    }

    configIdPath() {
        this.app.param(`userId`, UsersMiddleware.extractId);
        this.app
            .route(`/users/:userId`)
            .all(
                UsersMiddleware.validateUserExists,
                JwtMiddleware.validJWTNeeded,
                PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(UsersController.getUserById)
            .delete(UsersController.remove);

        this.app.put(`/users/:userId`, [
            body("login")
                .isLength({ min: 5 })
                .withMessage("Login must have 5+ characters"),
            body("password")
                .isLength({ min: 8 })
                .withMessage("Password must have 8+ characters"),
            body("permissionLevel").isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameLoginBelongToSameUser,
            UsersMiddleware.userCantChangePermission,
            PermissionMiddleware.minimumPermissionLevelRequired(
                PermissionLevel.USER_PERMISSION
            ),
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body("login")
                .isLength({ min: 5 })
                .withMessage("Login must have 5+ characters")
                .optional(),
            body("password")
                .isLength({ min: 8 })
                .withMessage("Password must have 8+ characters")
                .optional(),
            body("permissionLevel").isInt().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validatePatchLogin,
            UsersMiddleware.userCantChangePermission,
            PermissionMiddleware.minimumPermissionLevelRequired(
                PermissionLevel.USER_PERMISSION
            ),
            UsersController.patch,
        ]);

        /**
         * This route is here only for unit test reasons, should be protected if used in production
         */
        this.app.patch(`/users/:userId/permissionLevel/:permission`, [
            UsersController.updatePermission
        ]);
    }
}
