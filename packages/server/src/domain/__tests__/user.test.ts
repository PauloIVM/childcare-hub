import { User } from "../";

describe("User", () => {
    test("should create user", async () => {
        const user = User.create(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password"
        );
        expect(user.id).toBe("user_id");
        expect(user.userName).toBe("user_name");
        expect(user.email).toBe("user@gmail.com");
        expect(user.password.hash).not.toBe("user_password");
        expect(user.password.equals("user_password")).toBe(true);
    });
});