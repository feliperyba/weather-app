import debug from "debug";
import express from "express";
import { PermissionLevel } from "../enums/common.permissionLevel.enum";

const logger: debug.IDebugger = debug("weather-api:common-permission-middleware");

class CommonPermissionMiddleware {
    minimumPermissionLevelRequired(requiredPermissionLevel: PermissionLevel) {
        return (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                const userPermissionLevel = parseInt(
                     res.locals.jwt.permissionLevel
                );
                if (userPermissionLevel >= requiredPermissionLevel) {
                    next();
                } else {
                    res.status(403).send();
                }
            } catch (e) {
                logger(e);
            }
        };
    }

    async onlySameUserOrAdminCanDoThisAction(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (
            req.params &&
            req.params.userId &&
            req.params.userId === res.locals.jwt.userId
        ) {
            return next();
        } else {
            const userPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
            if (userPermissionLevel & PermissionLevel.ADMIN_PERMISSION) {
                return next();
            } else {
                return res.status(403).send();
            }
        }
    }
}

export default new CommonPermissionMiddleware();
