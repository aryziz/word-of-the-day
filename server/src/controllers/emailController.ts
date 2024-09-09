import { Request, Response } from "express";
import EmailSubscription from "../models/email";
import apiDB from "../db/dataService";

/**
 * Checks if object is a mongoDB error
 * @param error A possible error object
 * @returns If the object passed in is a MongoDB error
 */
function isMongoError(error: unknown): error is { code: number } {
    return typeof error === 'object' && error !== null && 'code' in error;
}

/**
 * Handles email subscriptions
 * @param req Express Request object
 * @param res Express Response object
 */
export const postEmail = async (req: Request, res: Response) => {
    console.log(`[server]: Registration of email ${req.body.email} started..`);
    const { email } = req.body;

    const numberOfEmails: number = await apiDB.getNumberOfEmails();

    if (numberOfEmails > 100) {
        res.status(500).json({ message: "Too many emails in storage" });
    }

    try {
        const newSubscription = new EmailSubscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
        if (isMongoError(error) && error.code === 11000) {
            console.error("[server]: This email is already registered");
            res.status(400).json({ message: "This email is already registered" });
        } else {
            res.status(500).json({ error: error });
        }
    }
}