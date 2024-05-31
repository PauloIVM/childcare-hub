import { JwtManager } from "@/domain";
import { VerifyUsecase } from "../";
import { createUserRepository } from "./orchestrator";

describe("VerifyUsecase", () => {
    test("should verify", async () => {
        const tokenGenerator = new JwtManager().setExpiresInMinutes(2);
        const token = tokenGenerator.sign(
            await createUserRepository().findByEmail("user_1@gmail.com"),
            new Date()
        );
        const usecase = new VerifyUsecase();
        const result = usecase.exec(token);
        expect(result.userId).toBe("id_1");
    });

    test("should not verify expired", async () => {
        const tokenGenerator = new JwtManager().setExpiresInDays(1);
        const token = tokenGenerator.sign(
            await createUserRepository().findByEmail("user_1@gmail.com"),
            new Date("01/01/2024, 00:00:00")
        );
        const usecase = new VerifyUsecase();
        await expect(async () => usecase.exec(token)).rejects.toThrow(
            new Error("Expired or invalid token")
        );
    });
});
