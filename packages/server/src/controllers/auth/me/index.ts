import { Request, Response } from "express";
import { IMe } from "../../../usecases/auth";

export class MeController {
    private meUsecase: IMe;
    constructor(me: IMe) {
        this.meUsecase = me;
    }

    exec(req: Request, res: Response) {
        const result = this.meUsecase.get(req.session);
        if (result.err) {
            return res.status(result.err.status).json({
                message: result.err.message,
                errors: result.err.errors,
            });
        }
        res.json(result.res);
    }
}
