import { IAuthSessionInput, IAuthError } from "../types";
import { Result } from "../../../utils";

export interface ILogout {
    exec(input: IAuthSessionInput): Promise<Result<boolean, IAuthError>>;
}
