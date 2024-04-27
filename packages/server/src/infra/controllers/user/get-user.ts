import { Request, Response } from "express";
import { UserRepository } from "@/infra/repositories";
import { GetUserUsecase } from "@/application/usecases/user";
import { VerifyUsecase } from "@/application/usecases/auth";

export class GetUserController {
    async exec(req: Request, res: Response) {
        const token = req.headers?.authorization?.split(' ')[1] || "";
        if (!token) {
            return res.json({ message: "Token de autenticação não fornecido." });
        }
        const verifyUsecase = new VerifyUsecase();
        const { userId } = verifyUsecase.exec(token);
        if (!userId) { return res.json({}); }
        const getUserUsecase = new GetUserUsecase(new UserRepository());
        const user = await getUserUsecase.exec(userId);
        res.json({
            userName: user.userName,
            userEmail: user.email,
            message: "ok"
        });
    }
}
