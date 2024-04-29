import { NextFunction, Request, Response } from "express";
import { ValidationError } from "@/domain";

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (!(error instanceof ValidationError)) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(error.status || 400).json({ message: error.clientMessage });
}
