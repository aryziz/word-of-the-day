import express, { Router } from "express";
import * as wordController from "../controllers/wordController";
import * as emailController from "../controllers/emailController";


const router: Router = express.Router();

router.get("/", wordController.home);

router.get("/random-word", wordController.wordAndDefinitionApi);

router.get("/latest-word", wordController.getLatestWordApi);

router.post("/subscribe", emailController.postEmail);

export = router;
