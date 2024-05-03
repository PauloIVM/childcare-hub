import { JwtManager, User } from "../";
import { sleep } from "@/utils";

describe("JwtManager", () => {

    let user: User;
    beforeEach(() => {
        user = User.create(
            "user_id",
            "user_name",
            "user@gmail.com",
            "user_p@ssword"
        );
    });

    test("should sign and verify token", async () => {
        const tokenManager = new JwtManager("secret"); 
        const token = tokenManager.sign(user, new Date());
        expect(tokenManager.verify(token).userId).toBe("user_id");
    });

    test("should not verify expired token", async () => {
        const tokenManager = new JwtManager("secret").setExpiresInSeconds(1); 
        const token = tokenManager.sign(user, new Date());
        expect(tokenManager.verify(token).userId).toBe("user_id");
        await sleep(1000);
        expect(() => tokenManager.verify(token)).toThrow(new Error(
            "Expired or invalid token"
        ));
    });

    test("should handle bad inputs", async () => {
        const tokenManager = new JwtManager("secret"); 
        expect(() => tokenManager.verify(null)).toThrow(new Error(
            "Expired or invalid token"
        ));
        expect(() => tokenManager.verify(undefined)).toThrow(new Error(
            "Expired or invalid token"
        ));
        expect(() => tokenManager.verify("")).toThrow(new Error(
            "Expired or invalid token"
        ));
        expect(() => tokenManager.verify("foo")).toThrow(new Error(
            "Expired or invalid token"
        ));
        expect(() => tokenManager.verify(10 as any)).toThrow(new Error(
            "Expired or invalid token"
        ));
        expect(() => tokenManager.verify({} as any)).toThrow(new Error(
            "Expired or invalid token"
        ));
    });

    test("should parse expires in minutes", async () => {
        const tokenManager = new JwtManager("secret").setExpiresInMinutes(1 / 60); 
        const token = tokenManager.sign(user, new Date());
        expect(tokenManager.verify(token).userId).toBe("user_id");
        await sleep(1000);
        expect(() => tokenManager.verify(token)).toThrow(new Error(
            "Expired or invalid token"
        ));
    });

    test("should parse expires in hours", async () => {
        const tokenManager = new JwtManager("secret").setExpiresInHours(1 / (60 * 60)); 
        const token = tokenManager.sign(user, new Date());
        expect(tokenManager.verify(token).userId).toBe("user_id");
        await sleep(1000);
        expect(() => tokenManager.verify(token)).toThrow(new Error(
            "Expired or invalid token"
        ));
    });

    test("should parse expires in days", async () => {
        const tokenManager = new JwtManager("secret").setExpiresInDays(1 / (24 * 60 * 60)); 
        const token = tokenManager.sign(user, new Date());
        expect(tokenManager.verify(token).userId).toBe("user_id");
        await sleep(1000);
        expect(() => tokenManager.verify(token)).toThrow(new Error(
            "Expired or invalid token"
        ));
    });
});