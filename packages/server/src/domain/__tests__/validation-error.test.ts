import { ValidationError } from "../";

describe("ValidationError", () => {
    test("should throw error", async () => {
        try {
            throw new ValidationError({
                message: "error_message",
                clientMessage: "error_client_message",
                status: 1000
            });
        } catch (error) {
            expect(error instanceof ValidationError).toBe(true);
            expect(error.message).toBe("error_message");
            expect(error.clientMessage).toBe("error_client_message");
            expect(error.status).toBe(1000);
        }
    });
});
