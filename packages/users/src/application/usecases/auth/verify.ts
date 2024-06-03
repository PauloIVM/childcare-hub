import { BaseError, TokenManager } from "@/domain";

export class VerifyUsecase {
    constructor() {}

    exec(token: string): { userId?: string; } {
        if (!token) {
            throw new BaseError({
                clientMessage: "Token de autenticação não fornecido.",
                message: "Missing token."
            });
        }
        const tokenGenerator = new TokenManager();
        const { userId } = tokenGenerator.verify(token);
        return { userId };
    }
}
