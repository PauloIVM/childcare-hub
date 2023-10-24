import { ILogout } from "./types";
import { IAuthSessionInput } from "../types";
import { ok } from "../../../utils/result";

export class Logout implements ILogout {
    async exec(input: IAuthSessionInput) {
        const promise: ReturnType<ILogout["exec"]> = new Promise((resolve) => {
            if (input.user) {
                input.destroy(() => {
                    resolve(ok(true));
                });
            } else {
                resolve(ok(false));
            }
        });
        return promise;
    }
}
