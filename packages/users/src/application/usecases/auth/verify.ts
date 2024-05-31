import { TokenManager } from "@/domain";

export class VerifyUsecase {
    constructor() {}

    exec(token: string): { userId?: string; } {
        const tokenGenerator = new TokenManager();
        const { userId } = tokenGenerator.verify(token);
        return { userId };
    }
}
