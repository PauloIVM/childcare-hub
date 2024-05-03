import { JwtManager } from "@/domain";

export class VerifyUsecase {
    constructor() {}

    exec(token: string): { userId?: string; } {
        // TODO: Criar os ENVs em que eu possa definir esse secret...
        const tokenGenerator = new JwtManager("secret");
        const { userId } = tokenGenerator.verify(token);
        return { userId };
    }
}
