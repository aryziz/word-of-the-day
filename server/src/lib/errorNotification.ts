import notifier from "node-notifier";
import { Request } from "express";

export default function errorNotification(err: Error, str: string, req: Request) {
    const title = `Error in ${req.method} ${req.url}`;

    notifier.notify({
        title: title,
        message: str
    });
}