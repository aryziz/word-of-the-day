import fs from "fs";
import path from "path";
import apiRoutes from "./routes/api";
// External
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import { engine as expressHandlebars } from "express-handlebars";

dotenv.config();

const app: Express = express();

const port: number | string = process.env.PORT || 3000;

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main",
    extname: ".handlebars"
}));
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

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
app.use(morgan("dev"));

app.listen(port, () => {
    console.log(
        `[server]: Listening on port ${port} in ${app.get("env")} mode...`
    );
});
