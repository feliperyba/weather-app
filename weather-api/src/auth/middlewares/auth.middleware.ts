import * as argon2 from "argon2";
import express from "express";
import UsersService from "../../users/services/users.service";

class AuthMiddleware {
    async verifyUserPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user: any = await UsersService.readByLoginWithPassword(
            req.body.login
        );
        if (user) {
            const passwordHash = user.password;
            if (await argon2.verify(passwordHash, req.body.password)) {
                req.body = {
                    userId: user._id,
                    login: user.login,
                    permissionLevel: user.permissionLevel,
                };
                return next();
            }
        }
        res.status(400).send({ errors: ["Invalid login and/or password"] });
    }
}

export default new AuthMiddleware();
