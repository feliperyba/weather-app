import debug from "debug";
import mongoose from "mongoose";

const logger: debug.IDebugger = debug("weather-api:mongoose-service");

class MongooseService {
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        logger("Attempting MongoDB connection ...");
        mongoose
            .connect(process.env.MONGODB_SERVER || "mongodb://localhost:27017/api-db", this.mongooseOptions)
            .then(() => {
                logger("MongoDB is connected");
            })
            .catch((err) => {
                const retrySeconds = 5;
                logger(`MongoDB connection unsuccessful, retryig after ${retrySeconds} seconds ...:`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();