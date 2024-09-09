import cron from "node-cron";
import apiDB from "../db/dataService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IEmail } from "../models/email";
import SMTPTransport from "nodemailer/lib/smtp-transport";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: process.env.BREVO_PORT,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
} as SMTPTransport.Options);

cron.schedule("0 0 * * *", async () => {
    try {
        console.log("[server]: Sending newsletter emails..");
        const subscriptions: IEmail[] = await apiDB.getAllActiveEmails();

        subscriptions.forEach(async (subscription: IEmail) => {
            const mailOptions = {
                from: `WOTD <${process.env.SENDER_MAIL}>`,
                to: subscription.email,
                subject: "Your new daily word is here!",
                text: "Check out wotd.io to keep learning 🔥"
            }
            await transporter.sendMail(mailOptions);
            console.log(`[server]: Sending to ${subscription.email}..`);
        });

    } catch (error) {
        console.error(`[server]: Error: ${error}`);
    }
});