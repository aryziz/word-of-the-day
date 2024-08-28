import Word from "../models/word";
import EmailSubscription from "../models/email";
import { IEmail } from "../models/email";

export = {
    getLatestWord: async () => await Word.findOne().sort({ createdAt: -1 }).exec(),
    getAllActiveEmails: async (): Promise<IEmail[]> => await EmailSubscription.find({ active: true }).exec(),
    getNumberOfEmails: async (): Promise<number> => await EmailSubscription.countDocuments().exec(),
}