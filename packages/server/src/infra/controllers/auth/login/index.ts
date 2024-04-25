import { Request, Response } from "express";
import { ILogin } from "@/application/usecases/auth";

export class LoginController {
    private loginUsecase: ILogin;
    constructor(login: ILogin) {
        this.loginUsecase = login;
    }

    async exec(req: Request, res: Response) {
        const { email, password } = req.body?.user || {};
        const result = await this.loginUsecase.exec({
            email,
            password,
            session: req.session,
        });
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json(result.res);
    }
}
