import { Password } from "../";

describe("Password", () => {
    test("should not accept weak passwords", async () => {
        expect(() => Password.create("12$%^")).toThrow(new Error(
            "Invalid password."
        ));
        expect(() => Password.create("password")).toThrow(new Error(
            "Invalid password."
        ));
        expect(() => Password.create("1234567")).toThrow(new Error(
            "Invalid password."
        ));
    });

    test("should create password", async () => {
        const password = Password.create("123$%^");
        expect(password.equals("123$%^")).toBe(true);
        expect(password.hash).not.toBe("123$%^");
    });

    test("should restore password", async () => {
        const password = Password.restore("pass_hash");
        expect(password.equals("pass_hash")).toBe(false);
        expect(password.hash).toBe("pass_hash");
    });
});