import { IAuthSessionInput, IAuthUserSession, IAuthError } from "../types";
import { Result } from "../../../utils";

export interface IAuthLoginInput {
    email?: string;
    password?: string;
    session: IAuthSessionInput;
}

export interface ILogin {
    exec(input: IAuthLoginInput): Promise<Result<IAuthUserSession, IAuthError>>;
}
