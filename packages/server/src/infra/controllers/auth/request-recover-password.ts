import { Request, Response } from "express";
import { RequestRecoverUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories/user-repository";

export class RequestRecoverController {
    async exec(req: Request, res: Response) {
        const { email } = req.body?.user || {};
        if (!email) {
            return res.status(400).json({ message: "Required fields: email." });
        }
        const usecase = new RequestRecoverUsecase(new UserRepository());
        // TODO: Passar todos esses try-catchs dos controllers pra um middleware
        try {
            await usecase.exec(email);
            res.json({ message: "Email sent." });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
