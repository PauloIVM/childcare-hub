import { IAuthSessionInput, IAuthUserSession, IAuthError } from "../types";
import { Result } from "@/utils";

export interface IMe {
    get(input: IAuthSessionInput): Result<IAuthUserSession, IAuthError>;
}
