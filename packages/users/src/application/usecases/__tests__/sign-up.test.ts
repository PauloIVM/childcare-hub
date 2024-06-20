import { SignUpUsecase } from "../";
import { createUserRepository, createServicesNotifierGateway } from "./orchestrator";

describe("SignUpUsecase", () => {
    test("should sign-up", async () => {
        const repository = createUserRepository();
        const usecase = new SignUpUsecase(repository, createServicesNotifierGateway());
        const result = await usecase.exec({
            name: "user_5",
            email: "user_5@gmail.com",
            password: "user_5_p@assword"
        });
        const persistedUser = await repository.findByEmail("user_5@gmail.com");
        expect(result.userEmail).toBe("user_5@gmail.com");
        expect(result.userName).toBe("user_5");
        expect(result.token).not.toBeNull();
        expect(persistedUser.email).toBe("user_5@gmail.com");
    });

    test("should not sign-up existing email", async () => {
        const repository = createUserRepository();
        const usecase = new SignUpUsecase(repository, createServicesNotifierGateway());
        await expect(async () => usecase.exec({
            name: "user_5",
            email: "user_4@gmail.com",
            password: "user_5_p@assword"
        })).rejects.toThrow(new Error("Invalid email."));
    });

    test("should not sign-up with bad password", async () => {
        const repository = createUserRepository();
        const usecase = new SignUpUsecase(repository, createServicesNotifierGateway());
        await expect(async () => usecase.exec({
            name: "user_5",
            email: "user_5@gmail.com",
            password: "user"
        })).rejects.toThrow(new Error("Invalid password."));
    });

    test("should not crash", async () => {
        const repository = createUserRepository();
        const usecase = new SignUpUsecase(repository, createServicesNotifierGateway());
        await expect(async () => usecase.exec({
            name: null,
            email: "user_5@gmail.com",
            password: "user_5_p@assword"
        })).rejects.toThrow(new Error("Missing required fields."));
        await expect(async () => usecase.exec({
            name: "user_5",
            email: null,
            password: "user_5_p@assword"
        })).rejects.toThrow(new Error("Missing required fields."));
        await expect(async () => usecase.exec({
            name: "user_5",
            email: "user_5@gmail.com",
            password: null
        })).rejects.toThrow(new Error("Missing required fields."));
    });
});
