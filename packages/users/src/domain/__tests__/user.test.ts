import { User } from "../";

describe("User", () => {
    test("should create user", async () => {
        const user = User.create(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_p@ssword"
        );
        expect(user.id).toBe("user_id");
        expect(user.userName).toBe("user_name");
        expect(user.email).toBe("user@gmail.com");
        expect(user.password.hash).not.toBe("user_p@ssword");
        expect(user.password.equals("user_p@ssword")).toBe(true);
    });

    test("should restore user", async () => {
        const user = User.restore(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password_hash"
        );
        expect(user.id).toBe("user_id");
        expect(user.userName).toBe("user_name");
        expect(user.email).toBe("user@gmail.com");
        expect(user.password.hash).toBe("user_password_hash");
        expect(user.password.equals("user_password_hash")).toBe(false);
    });

    test("should not create/restore user with invalid email", async () => {
        const args: Parameters<typeof User.create> = [
            "user_id",
            "user_name",
            "user@gmai",
            "user_p@ssword"
        ];
        expect(() => User.create(...args)).toThrow(new Error("Invalid email."));
        expect(() => User.restore(...args)).toThrow(new Error("Invalid email."));
    });

    test("should not set user with invalid email", async () => {
        const user = User.restore(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password_hash"
        );
        expect(() => user.updateEmail("@gmail.com")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail("gmail.com")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail("user@gmai")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail("user@")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail("user")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail("")).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail(undefined)).toThrow(new Error("Invalid email."));
        expect(() => user.updateEmail(null)).toThrow(new Error("Invalid email."));
    });

    test("should update user valid email", async () => {
        const user = User.restore(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password_hash"
        );
        expect(() => user.updateEmail("foo@bar.pt")).not.toThrow();
        expect(user.email).toBe("foo@bar.pt");
    });

    test("should not set invalid password", async () => {
        const user = User.restore(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password_hash"
        );
        expect(() => user.updatePassword("123")).toThrow(new Error("Invalid password."));
    });

    test("should set valid password", async () => {
        const user = User.restore(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_password_hash"
        );
        user.updatePassword("123!@#");
        expect(user.password.equals("123!@#")).toBe(true);
    });

    test("should not set invalid username", async () => {
        const args1: Parameters<typeof User.create> = [
            "user_id",
            null,
            "user@gmail.com",
            "user_p@ssword"
        ];
        const args2: Parameters<typeof User.create> = [
            "user_id",
            undefined,
            "user@gmail.com",
            "user_p@ssword"
        ];
        const args3: Parameters<typeof User.create> = [
            "user_id",
            "",
            "user@gmail.com",
            "user_p@ssword"
        ];
        const args4: Parameters<typeof User.create> = [
            "user_id",
            "u",
            "user@gmail.com",
            "user_p@ssword"
        ];
        expect(() => User.create(...args1)).toThrow(new Error("Invalid username."));
        expect(() => User.restore(...args1)).toThrow(new Error("Invalid username."));
        expect(() => User.create(...args2)).toThrow(new Error("Invalid username."));
        expect(() => User.restore(...args2)).toThrow(new Error("Invalid username."));
        expect(() => User.create(...args3)).toThrow(new Error("Invalid username."));
        expect(() => User.restore(...args3)).toThrow(new Error("Invalid username."));
        expect(() => User.create(...args4)).toThrow(new Error("Invalid username."));
        expect(() => User.restore(...args4)).toThrow(new Error("Invalid username."));
    });
});
