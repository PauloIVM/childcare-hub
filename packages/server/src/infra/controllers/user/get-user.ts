import { Request, Response } from "express";
import { GetUserUsecase } from "@/application/usecases/user/get";
import { UserRepository } from "@/infra/repositories/user-repository";
import { VerifyUsecase } from "@/application/usecases/auth";

export class GetUserController {
    async exec(req: Request, res: Response) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Token de autenticação não fornecido." });
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verifyUsecase = new VerifyUsecase();
            const { userId } = verifyUsecase.exec(token);
            if (!userId) { return res.json({}); }
            const getUserUsecase = new GetUserUsecase(new UserRepository());
            const user = await getUserUsecase.exec(userId);
            res.json({ userName: user.userName, userEmail: user.email });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
