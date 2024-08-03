import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import apiRoutes from "./routes/api";

dotenv.config();

const app: Express = express();

const port: number | string = process.env.PORT || 3000;

app.use(express.json());
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
app.use(morgan("dev"));

app.listen(port, () => {
    console.log(
        `[server]: Listening on port ${port} in ${app.get("env")} mode...`
    );
});
