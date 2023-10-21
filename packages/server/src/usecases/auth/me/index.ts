import { IMe } from "./types";
import { IAuthSessionInput } from "../types";
import { ok } from "../../../utils";

export class Me implements IMe {
    get(input: IAuthSessionInput) {
        if (input && input.id && input.user) {
            return ok({ id: input.id, user: input.user });
        }
        return ok({ id: null, user: null });
    }
}
