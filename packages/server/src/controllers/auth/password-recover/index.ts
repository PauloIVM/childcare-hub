import { Request, Response } from "express";
import { IPasswordRecover } from "../../../usecases/auth";

export class PasswordRecoverController {
    private passwordRecover: IPasswordRecover;
    constructor(passwordRecover: IPasswordRecover) {
        this.passwordRecover = passwordRecover;
    }

    async exec(req: Request, res: Response) {
        const result = await this.passwordRecover.exec(req.body);
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json(result.res);
    }
}
