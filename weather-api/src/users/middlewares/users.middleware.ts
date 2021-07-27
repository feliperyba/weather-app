import express from "express";
import UserService from "../services/users.service";

class UsersMiddleware {
    async userCantChangePermission(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            "permissionLevel" in req.body &&
            req.body.permissionLevel !== res.locals.user.permissionLevel
        ) {
            res.status(400).send(
                {
                    errors: ["User cannot change permission level"]
                }
            );
        } else {
            next();
        }
    }

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserService.readById(req.params.userId);
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send(
                {
                    error: `User ${req.params.userId} not found`
                }
            );
        }
    }

    async validateSameLoginDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await UserService.readByLogin(req.body.login);
        if (user) {
            res.status(400).send(
                {
                    errors: ["User login already exists"]
                }
            );
        } else {
            next();
        }
    }

    async validateSameLoginBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user._id === req.params.userId) {
            next();
        } else {
            res.status(400).send(
                {
                    errors: ["Invalid login"]
                }
            );
        }
    }

    validatePatchLogin = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (req.body.login) {
            this.validateSameLoginBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    async extractId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.userId = req.params.userId;
        next();
    }
}

export default new UsersMiddleware();