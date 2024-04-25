import { IMe } from "./types";
import { IAuthSessionInput } from "../types";
import { ok } from "@/utils";

// TODO: Talvez um nome melhor pra esse usecase seja: get-user-by-session, ou /verify
export class Me implements IMe {
    get(session: IAuthSessionInput) {
        if (session && session.id && session.user) {
            return ok({ id: session.id, user: session.user });
        }
        return ok({ id: null, user: null });
    }
}
