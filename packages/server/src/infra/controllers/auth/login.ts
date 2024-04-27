import { Request, Response } from "express";
import { LoginUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories";

// TODO: Agora os errors estão mais ok. Vale a pena os controllers em si não retornarem
//       um res.status de error, mas sim o ValidationError? Pq aí eu consigo desacoplar
//       a request do parser dos campos... isso pode facilitar alguns refactors futuros.
export class LoginController {
    async exec(req: Request, res: Response) {
        const { email, password } = req.body?.user || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Os campos 'email' e 'senha' são obrigatórios." });
        }
        const usecase = new LoginUsecase(new UserRepository());
        const { token, userEmail, userName } = await usecase.exec(
            email,
            password,
            new Date()
        );
        res.json({ token, userEmail, userName, message: "ok" });
    }
}
