import { Request, Response } from "express";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from "axios";

export const home = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "hey" });
}

type RandomWord = {
    word: string;
}

type WordDefinition = {
    word: string,
    definition: string,
}

const randomWordApi = async (): Promise<RandomWord> => {
    const client: AxiosInstance = axios.create({
        baseURL: "https://api.api-ninjas.com"
    });
    const config: AxiosRequestConfig = {
        headers: {
            'X-Api-Key': process.env.RANDOM_WORD_KEY as string
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.get('/v1/randomword', config);
        return { word: response.data.word[0] };
    } catch (err) {
        console.error(`[server]: Error fetching random word: ${err}`);
        throw new Error("Server Error");
    }
}

const wordDefinitionApi = async (word: string): Promise<WordDefinition> => {
    const client: AxiosInstance = axios.create({
        baseURL: "https://www.dictionaryapi.com"
    });
    const queryString: string = `?key=${process.env.MERRIAM_KEY}`
    const fullUrl: string = "/api/v3/references/sd3/json/" + encodeURIComponent(word) + queryString;
    try {
        const response: AxiosResponse = await client.get(fullUrl);
        const testDef = response.data[0];
        console.log(testDef);
        if (typeof testDef === "string" || testDef instanceof String) {
            return await wordDefinitionApi(testDef[0]);
        }
        return { word: testDef.meta.id, definition: testDef.shortdef }
    } catch (err) {
        console.error(`[server]: Error fetching random word: ${err}`);
        // May want to return something else
        throw new Error("Server Error");
    }
}

export const wordAndDefinitionApi = async (req: Request, res: Response): Promise<void> => {

    const wordResponse: RandomWord = await randomWordApi();
    const { word } = wordResponse;

    const definitionResponse: WordDefinition = await wordDefinitionApi(word);

    res.status(200).json({ definitionResponse });
}