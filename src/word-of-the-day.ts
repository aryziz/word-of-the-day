import fs from "fs";
import apiRoutes from "./routes/api";
import connectDB from "./db/connect";
// External
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config();

const app: Express = express();

const port: number | string = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", apiRoutes);

switch (app.get("env")) {
    case "development":
        app.use(morgan("dev"));
        break;

    case "production": {
        const stream: fs.WriteStream = fs.createWriteStream(
            __dirname + "/log/access.log",
            { flags: "a" }
        );
        app.use(morgan("combined", { stream }));
        break;
    }
}

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL as string)
        app.listen(port, () => {
            console.log(
                `[server]: Listening on port ${port} in ${app.get("env")} mode...`
            );
        });
    } catch (err) {
        console.error(err);
    }
};

if (require.main == module) {
    startServer();
} else {
    module.exports = startServer;
}