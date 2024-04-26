import { Request, Response } from "express";
import { IUserDTO } from "@/application/dtos/user-dto";
import { SignUpUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories/user-repository";

export class SignUpController {
    async exec(req: Request, res: Response) {
        const { email, name, password } = req.body?.user || {};
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Os campos 'nome', 'email' e 'senha' são obrigatórios." });
        }
        const usecase = new SignUpUsecase(new UserRepository());
        try {
            const { token, userEmail, userName } = await usecase.exec({
                email,
                name,
                password
            }, new Date());
            res.json({ token, userEmail, userName, message: "ok" });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
