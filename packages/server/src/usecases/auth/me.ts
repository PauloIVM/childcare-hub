import { AuthSessionInput } from "./types";
import { ok } from "../../utils";

export class Me {
    get(input: AuthSessionInput) {
        if (input && input.id && input.user) {
            return ok({ id: input.id, user: input.user });
        }
        return ok({ id: null, user: null });
    }
}
