import mongoose from "mongoose";

/**
 * Function to connect to your mongoDB database
 * @param url the mongodb URL
 * @returns the connection to your mongoDB instance
 */
export const connectDB = (url: string) => {
    return mongoose.connect(url)
        .then(() => console.log("[server]: MongoDB connection established!"))
        .catch(err => console.error(`[server]: MongoDB error: ${err.message}`));
}
