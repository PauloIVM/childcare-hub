import { JwtManager } from "@/domain";

export class VerifyUsecase {
    constructor() {}

    exec(token: string): { userId?: string; } {
        const tokenGenerator = new JwtManager();
        const { userId } = tokenGenerator.verify(token);
        return { userId };
    }
}
