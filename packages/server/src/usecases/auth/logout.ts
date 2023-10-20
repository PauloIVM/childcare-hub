import { AuthSessionInput } from "./types";
import { ok } from "../../utils/result";

export class Logout {
    exec(input: AuthSessionInput) {
        return new Promise((resolve) => {
            if (input.user) {
                input.destroy(() => {
                    resolve(ok(true));
                });
            } else {
                resolve(ok(false));
            }
        });
    }
}
