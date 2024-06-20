import { LoginUsecase } from "../";
import { createUserRepository } from "./orchestrator";

describe("LoginUsecase", () => {
    test("should login", async () => {
        const usecase = new LoginUsecase(createUserRepository());
        const result = await usecase.exec("user_1@gmail.com", "user_1_p@ssword");
        expect(result.userEmail).toBe("user_1@gmail.com");
        expect(result.userName).toBe("user_1");
        expect(result.token).not.toBeNull();
    });

    test("should not login with invalid email/password", async () => {
        const usecase = new LoginUsecase(createUserRepository());
        await expect(async () => usecase.exec("user_1@gmail.com", "wrong_password"))
            .rejects
            .toThrow(new Error("Bad email/password."));
        await expect(async () => usecase.exec("wrong_email@gmail.com", "wrong_password"))
            .rejects
            .toThrow(new Error("Bad email/password."));
    });

    test("should not crash with bad inputs", async () => {
        const usecase = new LoginUsecase(createUserRepository());
        await expect(async () => usecase.exec(null, null))
            .rejects
            .toThrow(new Error("Missing required fields"));
        await expect(async () => usecase.exec(0 as any, 0 as any))
            .rejects
            .toThrow(new Error("Missing required fields"));
    });
});
