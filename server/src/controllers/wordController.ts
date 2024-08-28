import { Request, Response } from "express";
import apiDB from "../db/api";
import { randomWordApi, wordDefinitionApi, WordDefinition, RandomWord } from "../lib/randomWord";
import EmailSubscription from "../models/email";
import { Error as MongooseError } from "mongoose";

export const home = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "hey" });
}

export const wordAndDefinitionApi = async (req: Request, res: Response): Promise<void> => {
    /**
     * Handles the API request to fetch a random word and its definition.
     * Sends the word and its definition in the response as JSON.
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A promise that resolves when the response is sent.
     */

    try {
        const wordResponse: RandomWord = await randomWordApi();
        const { word } = wordResponse;

        const definitionResponse: WordDefinition = await wordDefinitionApi(word);

        res.status(200).json({ definitionResponse });
    } catch (err) {
        console.error(`[server]: Error in wordAndDefinitionApi: ${err}`);
        res.status(500).json({ error: "Failed to fetch word or definition" });
    }
}

export const getLatestWordApi = async (req: Request, res: Response) => {
    /**
     * Serves the latest word with its definitions in JSON format
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A promise that resolves when the response is sent.
     */
    try {
        const newestWord = await apiDB.getLatestWord();
        if (newestWord) {
            res.status(200).json(newestWord);
        } else {
            res.status(404).json({ message: "No words found" });
        }
    } catch (err) {
        console.error(`[server]: Error fetching newest word: ${err}`);
        res.status(500).json({ message: "Server error" });
    }
}

function isMongoError(error: unknown): error is { code: number } {
    return typeof error === 'object' && error !== null && 'code' in error;
}

export const postEmail = async (req: Request, res: Response) => {
    console.log(`[server]: Registration of email ${req.body.email} started..`);
    const { email } = req.body;

    const numberOfEmails: number = await apiDB.getNumberOfEmails();

    if (numberOfEmails > 100) {
        res.status(500).json({ message: "Too many emails in storage" });
    }

    try {
        const newSubscription = new EmailSubscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
        if (isMongoError(error) && error.code === 11000) {
            console.error("[server]: This email is already registered");
            res.status(400).json({ message: "This email is already registered" });
        } else {
            res.status(500).json({ error: error });
        }
    }
}