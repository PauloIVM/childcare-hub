import { JwtManager, User } from "@/domain";
import { RecoverPasswordUsecase } from "../";
import { createUserRepository, createEmailGateway } from "./orchestrator";

describe("RecoverPasswordUsecase", () => {
    let token: string;
    beforeAll(async () => {
        const tokenGenerator = new JwtManager("secret");
        token = tokenGenerator.sign(
            await createUserRepository().findByEmail("user_1@gmail.com"),
            new Date("01/05/2024, 01:16:11")
        );
    });
    test("should recover", async () => {
        const sentMessages: string[] = [];
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        const result = await usecase.exec("new_p@ssword", token, new Date("01/05/2024, 01:17:11"));
        expect(sentMessages[0]).toBe("Olá, user_1. Você solicitou uma alteração de senha.");
        expect(sentMessages.length).toBe(1);
    });

    // test("should not send email request to invalid user", async () => {
    //     const sentMessages: string[] = [];
    //     const userRepository = createUserRepository();
    //     const emailGateway = createEmailGateway(sentMessages);
    //     const usecase = new RequestRecoverUsecase(userRepository, emailGateway);
    //     await expect(async () => usecase.exec("wrong@gmail.com")).rejects
    //         .toThrow(new Error("No user with this email."));
    //     expect(sentMessages.length).toBe(0);
    // });

    // test("should not crash", async () => {
    //     const sentMessages: string[] = [];
    //     const userRepository = createUserRepository();
    //     const emailGateway = createEmailGateway(sentMessages);
    //     const usecase = new RequestRecoverUsecase(userRepository, emailGateway);
    //     await expect(async () => usecase.exec(null)).rejects
    //         .toThrow(new Error("No user with this email."));
    //     expect(sentMessages.length).toBe(0);
    // });
});
