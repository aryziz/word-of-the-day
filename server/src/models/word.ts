import mongoose, { Document, Schema } from "mongoose";

export interface IWord extends Document {
    word: string;
    definitions: string[];
    createdAt: Date;
}

const WordSchema: Schema<IWord> = new mongoose.Schema({
    word: {
        type: String,
        required: [true, "Word is required"],
        trim: true
    },
    definitions: {
        type: [String],
        required: [true, "At least one definition is required"],
        trim: true,
    },
}, {
    timestamps: true // Automatically add `createdAt` and `updatedAt` fields
});
const Word = mongoose.model<IWord>("Word", WordSchema);

export default Word;