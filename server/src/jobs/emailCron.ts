import cron from "node-cron";
import apiDB from "../db/dataService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IEmail } from "../models/email";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAILJET_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAILJET_KEY,
        pass: process.env.MAILJET_SECRET_KEY
    }
} as SMTPTransport.Options);

cron.schedule("* * * * *", async () => {
    try {
        console.log("[server]: Sending newsletter emails..");
        console.log("-".repeat(40));
        const subscriptions: IEmail[] = await apiDB.getAllActiveEmails();

        subscriptions.forEach(async (subscription: IEmail) => {
            const mailOptions = {
                from: `WOTD <${process.env.SENDER_MAIL}>`,
                to: subscription.email,
                subject: "Your new daily word is here!",
                text: "Check out wotd.io to keep learning 🔥"
            }
            await transporter.sendMail(mailOptions);
            console.log(`[server]: Mail to: ${subscription.email}`);
        });

    } catch (error) {
        console.error(`[server]: Error: ${error}`);
    }
});