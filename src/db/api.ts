import Word, { IWord } from "../models/word";

export = {
    getLatestWord: async () => Word.findOne().sort({ createdAt: -1 }).exec(),
    addWord: async (word: IWord) => {
        await Word.updateOne(
            { word },
            { upsert: true },
        )
    }
}