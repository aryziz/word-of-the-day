import express, { Router } from "express";
import * as api from "../controllers/api-handlers";


const router: Router = express.Router();

router.get("/", api.home);

router.get("/random-word", api.wordAndDefinitionApi);

router.get("/latest-word", api.getLatestWordApi);

export = router;
