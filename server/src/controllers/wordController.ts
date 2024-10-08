import { Request, Response } from "express";
import apiDB from "../db/dataService";
import { randomWordApi, wordDefinitionApi, WordDefinition, RandomWord } from "../lib/randomWord";


export const home = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "hey" });
}

/**
     * Handles the API request to fetch a random word and its definition.
     * Sends the word and its definition in the response as JSON.
     * @param req - The Express request object.
     * @param res - The Express response object.
     * @returns A promise that resolves when the response is sent.
     */
export const wordAndDefinitionApi = async (req: Request, res: Response): Promise<void> => {
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
