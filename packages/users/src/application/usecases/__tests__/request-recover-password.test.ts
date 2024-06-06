import { RequestRecoverUsecase } from "../";
import { createUserRepository, createEmailGateway } from "./orchestrator";

describe("RequestRecoverUsecase", () => {
    test("should send email request", async () => {
        const sentMessages: string[] = [];
        const userRepository = createUserRepository();
        const emailGateway = createEmailGateway(sentMessages);
        const usecase = new RequestRecoverUsecase(userRepository, emailGateway);
        await usecase.exec("user_1@gmail.com");
        expect(sentMessages[0]).toBe("Olá, user_1. Você solicitou uma alteração de senha.");
        expect(sentMessages.length).toBe(1);
    });

    test("should not send email request to invalid user", async () => {
        const sentMessages: string[] = [];
        const userRepository = createUserRepository();
        const emailGateway = createEmailGateway(sentMessages);
        const usecase = new RequestRecoverUsecase(userRepository, emailGateway);
        await expect(async () => usecase.exec("wrong@gmail.com")).rejects
            .toThrow(new Error("No user with this email."));
        expect(sentMessages.length).toBe(0);
    });

    test("should not crash", async () => {
        const sentMessages: string[] = [];
        const userRepository = createUserRepository();
        const emailGateway = createEmailGateway(sentMessages);
        const usecase = new RequestRecoverUsecase(userRepository, emailGateway);
        await expect(async () => usecase.exec(null)).rejects
            .toThrow(new Error("No user with this email."));
        expect(sentMessages.length).toBe(0);
    });
});
