import { IAuthSessionInput, IAuthUserSession, IAuthError } from "../types";
import { Result, Maybe } from "../../../utils";

export interface IAuthRegisterInput {
    user: Maybe<{
        userName: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }>;
    session: IAuthSessionInput;
}

export interface IRegister {
    exec(
        input: IAuthRegisterInput,
    ): Promise<Result<IAuthUserSession, IAuthError>>;
}
