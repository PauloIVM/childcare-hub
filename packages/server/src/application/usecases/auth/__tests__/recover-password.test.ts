import { JwtManager, User } from "@/domain";
import { RecoverPasswordUsecase } from "../";
import { createUserRepository } from "./orchestrator";

describe("RecoverPasswordUsecase", () => {
    let token: string;
    beforeEach(async () => {
        jest.spyOn(Date, "now").mockImplementation(() => new Date("01/05/2024, 01:17:11").getTime());
        const tokenGenerator = new JwtManager("secret").setExpiresInMinutes(2);
        token = tokenGenerator.sign(
            await createUserRepository().findByEmail("user_1@gmail.com"),
            new Date("01/05/2024, 01:16:11")
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("should recover", async () => {
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        const userBeforeChange = await userRepository.findByEmail("user_1@gmail.com");
        expect(userBeforeChange.password.equals("new_p@ssword")).toBe(false);
        const result = await usecase.exec("new_p@ssword", token);
        const userAfterChange = await userRepository.findByEmail("user_1@gmail.com");
        expect(userAfterChange.password.equals("new_p@ssword")).toBe(true);
        expect(result.userEmail).toBe("user_1@gmail.com");
        expect(result.userName).toBe("user_1");
        expect(result.token).not.toBeNull();
    });

    test("should not crash with email changed", async () => {
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        const user = await userRepository.findByEmail("user_1@gmail.com");
        user.updateEmail("user_1_updated@gmail.com");
        await userRepository.updateUser(user);
        const result = await usecase.exec("new_p@ssword", token);
        const userWithOldEmail = await userRepository.findByEmail("user_1@gmail.com");
        const userWithNewEmail = await userRepository.findByEmail("user_1_updated@gmail.com");
        expect(userWithOldEmail).toBe(undefined);
        expect(userWithNewEmail.password.equals("new_p@ssword")).toBe(true);
        expect(result.userEmail).toBe("user_1_updated@gmail.com");
        expect(result.userName).toBe("user_1");
        expect(result.token).not.toBeNull();
    });

    test("should not recover with expired token", async () => {
        jest.spyOn(Date, "now").mockImplementation(() => new Date("01/05/2024, 01:19:11").getTime());
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        await expect(async () => usecase.exec("new_p@ssword", token)).rejects
            .toThrow(new Error("Expired or invalid token"));
    });

    test("should not crash with user deleted", async () => {
        const tokenGenerator = new JwtManager("secret").setExpiresInMinutes(2);
        const token = tokenGenerator.sign(
            User.create("id_foo", "user_foo", "user_foo@gmail.com", "user_foo_p@ssword"),
            new Date("01/05/2024, 01:16:11")
        );
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        await expect(async () => usecase.exec("new_p@ssword", token)).rejects
            .toThrow(new Error("Could not find user."));
    });

    test("should not accept bad input", async () => {
        const userRepository = createUserRepository();
        const usecase = new RecoverPasswordUsecase(userRepository);
        await expect(async () => usecase.exec("bad_password", token)).rejects
            .toThrow(new Error("Invalid password."));
    });
});
