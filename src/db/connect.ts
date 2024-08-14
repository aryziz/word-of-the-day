import mongoose from "mongoose";

const connectDB = (url: string) => {
    return mongoose.connect(url)
        .then(() => console.log("[server]: MongoDB connection established!"))
        .catch(err => console.error(`[server]: MongoDB error: ${err.message}`));
}

export = connectDB;