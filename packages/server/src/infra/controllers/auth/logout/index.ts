import { Request, Response } from "express";
import { ILogout } from "../../../../usecases/auth";

export class LogoutController {
    private logoutUsecase: ILogout;
    constructor(logout: ILogout) {
        this.logoutUsecase = logout;
    }

    async exec(req: Request, res: Response) {
        const result = await this.logoutUsecase.exec(req.session);
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json({ ok: result.res });
    }
}
