import dotenv from "dotenv";
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import * as expressWinston from "express-winston";
import * as http from "http";
import * as winston from "winston";
import { AuthRoutes } from "./auth/auth.routes.config";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { WeatherRoutes } from "./weather/weather.routes.config";

const PORT = 3000;
const liveMessage = `Server live at port : ${PORT}`;
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const logger: debug.IDebugger = debug("weather-api");

const loggerOpt: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}
if (!process.env.DEBUG) loggerOpt.meta = false;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(expressWinston.logger(loggerOpt));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require("../openapi.json")));
app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send(liveMessage)
});

routes.push(new AuthRoutes(app));
routes.push(new WeatherRoutes(app));
routes.push(new UsersRoutes(app));

export default server.listen(PORT, () => {
    console.log(liveMessage);
    routes.forEach((route: CommonRoutesConfig) => {
        logger(`Route set: ${route.getName()}`);
    })
});