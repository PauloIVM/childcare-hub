import { Request, Response } from "express";
import { LoginUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories/user-repository";

export class LoginController {
    async exec(req: Request, res: Response) {
        const { email, password } = req.body?.user || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Required fields: email, password." });
        }
        const usecase = new LoginUsecase(new UserRepository());
        try {
            const { token } = await usecase.exec(email, password, new Date());
            res.json({ token });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
