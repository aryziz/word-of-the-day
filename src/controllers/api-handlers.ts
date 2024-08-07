import { Request, Response } from "express";
import { randomWordApi, wordDefinitionApi, WordDefinition, RandomWord } from "../lib/random-word";

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
    const wordResponse: RandomWord = await randomWordApi();
    const { word } = wordResponse;

    const definitionResponse: WordDefinition = await wordDefinitionApi(word);

    res.status(200).json({ definitionResponse });
}