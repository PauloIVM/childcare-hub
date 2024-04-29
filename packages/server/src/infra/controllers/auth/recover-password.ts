import { Request, Response } from "express";
import { RecoverPasswordUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories";

export class RecoverController {
    async exec(req: Request, res: Response) {
        const { password } = req.body?.user || {};
        const token = req.headers?.authorization?.split(' ')[1] || "";
        if (!token) {
            return res.status(401).json({ message: "Token de autenticação não fornecido." });
        }
        if (!password) {
            return res.status(400).json({ message: "O campo 'senha' é obrigatório." });
        }
        const usecase = new RecoverPasswordUsecase(
            new UserRepository()
        );
        const { token: newToken, userEmail, userName } = await usecase.exec(password, token);
        res.json({
            token: newToken,
            userEmail,
            userName,
            message: "Password updated."
        });
    }
}
