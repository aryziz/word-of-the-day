import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders, AxiosInstance } from "axios";

export interface RandomWord {
    word: string;
}

export interface WordDefinition {
    word: string,
    definition: string[],
}

export const randomWordApi = async (): Promise<RandomWord> => {
    /**
     * Fetches a random word from the Random Word API.
     * @returns A promise that resolves to an object containing a random word.
     * @throws Will throw an error if the API request fails.
     */
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

export const wordDefinitionApi = async (word: string): Promise<WordDefinition> => {
    /**
     * Fetches the definition of a word from the Merriam-Webster Dictionary API.
     * If the word is not found, it will choose a random suggestion from the list provided by the API and try again.
     * @param word - The word to fetch the definition for.
     * @returns A promise that resolves to an object containing the word and its definition.
     * @throws Will throw an error if the API request fails or if no suggestions are available.
     */
    const client: AxiosInstance = axios.create({
        baseURL: "https://www.dictionaryapi.com"
    });
    const queryString: string = `?key=${process.env.MERRIAM_KEY}`
    const fullUrl: string = "/api/v3/references/sd3/json/" + encodeURIComponent(word) + queryString;
    try {
        const response: AxiosResponse = await client.get(fullUrl);
        const data = response.data;

        if (data.length === 0) {
            throw new Error(`[server]: No suggestions available for the word ${word}`);
        }

        const firstEntry = data[0];

        if (typeof firstEntry === "string") {
            console.log(`[server]: Word (${word}) not found, choosing another word`)
            // Choose a random word from the list and run wordDefinition again
            const randomIndex: number = Math.floor(Math.random() * data.length);
            const suggestedWord = data[randomIndex];

            return await wordDefinitionApi(suggestedWord);
        }
        const wordId: string = firstEntry.meta.id
        return { word: wordId, definition: firstEntry.shortdef }
    } catch (err) {
        console.error(`[server]: Error fetching random word (${word}): ${err}`);
        throw new Error("Server Error");
    }
}