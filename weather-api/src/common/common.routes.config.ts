import express from "express";

export abstract class CommonRoutesConfig {
    public app: express.Application;
    public name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configRoutes();
    }

    abstract configRoutes(): express.Application;

    getName() {
        return this.name;
    }

}