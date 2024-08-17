import cron from "node-cron";
import { createNewWord } from "../lib/randomWord";

// Schedules the task to run every minute
cron.schedule("* * * * *", async () => {
    console.log("[server]: Running cron job createNewWord");
    const sentWord = await createNewWord();

    if (sentWord == null) {
        console.error("[server]: Something went wrong with the job (createNewWord)");
    } else {
        console.log("[server]: Job (createNewWord) completed");
    }
});