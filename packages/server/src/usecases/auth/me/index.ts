import { IMe } from "./types";
import { IAuthSessionInput } from "../types";
import { ok } from "../../../utils";

export class Me implements IMe {
    get(session: IAuthSessionInput) {
        if (session && session.id && session.user) {
            return ok({ id: session.id, user: session.user });
        }
        return ok({ id: null, user: null });
    }
}
