import express, { Router } from "express";
import * as api from "../controllers/wordController";


const router: Router = express.Router();

router.get("/", api.home);

router.get("/random-word", api.wordAndDefinitionApi);

router.get("/latest-word", api.getLatestWordApi);

router.get("/send-new-word", api.createWord);

export = router;
