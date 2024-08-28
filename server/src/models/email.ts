import mongoose, { Document, Schema } from "mongoose";

export interface IEmail extends Document {
    email: string;
    subscribedAt: Date;
    active: boolean;
}

const EmailSchema: Schema<IEmail> = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        trim: true
    },
    subscribedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
},
    {
        timestamps: true
    });

const EmailSubscription = mongoose.model<IEmail>("Email", EmailSchema);

export default EmailSubscription;