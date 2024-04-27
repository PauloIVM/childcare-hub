import { Request, Response } from "express";
import { LoginUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories";

// TODO: A forma como eu estou enviando os errors ao client pode facilmente vazar uma
//       informação sensível de uma exceção não prevista. Preciso de alguma forma identificar
//       se o error foi gerado pela minha aplicação ou não.
export class LoginController {
    async exec(req: Request, res: Response) {
        const { email, password } = req.body?.user || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Os campos 'email' e 'senha' são obrigatórios." });
        }
        const usecase = new LoginUsecase(new UserRepository());
        try {
            const { token, userEmail, userName } = await usecase.exec(
                email,
                password,
                new Date()
            );
            res.json({ token, userEmail, userName, message: "ok" });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
