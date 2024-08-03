import { Request, Response } from "express";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

export const home = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "hey" });
}


export const randomWordApi = async (req: Request, res: Response): Promise<void> => {
    const client = axios.create({
        baseURL: "https://api.api-ninjas.com"
    });

    type randomWord = {
        word: string;
    }

    const config: AxiosRequestConfig = {
        headers: {
            'X-Api-Key': process.env.RANDOM_WORD_KEY as string
        } as RawAxiosRequestHeaders,
    };
    try {
        const response: AxiosResponse = await client.get('/v1/randomword', config);
        const foundWord: randomWord[] = response.data.word;
        res.status(200).json({ "word": foundWord[0] });
    } catch (err) {
        console.log(err);
    }
}