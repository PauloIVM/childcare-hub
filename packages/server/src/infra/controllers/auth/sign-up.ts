import { Request, Response } from "express";
import { SignUpUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories";

export class SignUpController {
    async exec(req: Request, res: Response) {
        const { email, name, password } = req.body?.user || {};
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Os campos 'nome', 'email' e 'senha' são obrigatórios." });
        }
        const usecase = new SignUpUsecase(UserRepository.getInstance());
        const { token, userEmail, userName } = await usecase.exec({
            email,
            name,
            password
        }, new Date());
        res.json({ token, userEmail, userName, message: "ok" });
    }
}
