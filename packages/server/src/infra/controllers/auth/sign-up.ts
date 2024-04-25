import { Request, Response } from "express";
import { IUserDTO } from "@/application/dtos/user-dto";
import { SignUpUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories/user-repository";

export class SignUpController {
    async exec(req: Request, res: Response) {
        const { email, name, password } = req.body?.user || {};
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Required fields: email, password, name." });
        }
        const usecase = new SignUpUsecase(new UserRepository());
        try {
            const { token } = await usecase.exec({
                email,
                name,
                password
            }, new Date());
            res.json({ token });
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
