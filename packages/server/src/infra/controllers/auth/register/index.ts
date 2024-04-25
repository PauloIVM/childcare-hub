import { Request, Response } from "express";
import { IRegister } from "@/application/usecases/auth";

export class RegisterController {
    private registerUsecase: IRegister;
    constructor(register: IRegister) {
        this.registerUsecase = register;
    }

    async exec(req: Request, res: Response) {
        const result = await this.registerUsecase.exec({
            user: req.body?.user,
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
