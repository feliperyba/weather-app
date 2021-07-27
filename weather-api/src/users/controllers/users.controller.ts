import argon2 from "argon2";
import debug from "debug";
import express from "express";
import { PatchUserDto } from "users/dto/patch.user.dto";
import UsersService from "../services/users.service";

const logger: debug.IDebugger = debug("weather-api:users-controller");

class UsersController {
    async getUserById(req: express.Request, res: express.Response) {
        const user = await UsersService.readById(req.body.userId);
        res.status(200).send(user);
    }

    async create(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await UsersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        logger(await UsersService.patchById(req.body.userId, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        logger(await UsersService.putById(req.body.userId, req.body));
        res.status(204).send();
    }

    async remove(req: express.Request, res: express.Response) {
        logger(await UsersService.deleteById(req.body.userId));
        res.status(204).send();
    }

    async updatePermission(req: express.Request, res: express.Response) {
        logger(await UsersService.patchById(req.params.userId, { permissionLevel: parseInt(req.params.permission) }));
        res.status(204).send();
    }

}

export default new UsersController();