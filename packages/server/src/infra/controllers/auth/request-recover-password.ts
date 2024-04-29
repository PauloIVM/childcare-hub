import { Request, Response } from "express";
import { RequestRecoverUsecase } from "@/application/usecases/auth";
import { UserRepository } from "@/infra/repositories";
import { EmailGateway } from "@/infra/gateways";

export class RequestRecoverController {
    async exec(req: Request, res: Response) {
        const { email } = req.body?.user || {};
        if (!email) {
            return res.status(400).json({ message: "Required fields: email." });
        }
        const usecase = new RequestRecoverUsecase(
            UserRepository.getInstance(),
            EmailGateway.getInstance()
        );
        await usecase.exec(email);
        res.json({ message: "Email sent." });
    }
}
