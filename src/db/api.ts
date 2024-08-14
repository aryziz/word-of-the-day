import Word from "../models/word";

export = {
    getLatestWord: async () => Word.findOne().sort({ createdAt: -1 }).exec(),
}