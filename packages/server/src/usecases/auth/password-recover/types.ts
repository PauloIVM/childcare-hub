import { IAuthError } from "../types";
import { Result } from "../../../utils";

interface IAuthPassRetrieveInput {
    email: string;
}

export interface IAuthPassRecoverInput {
    email: string;
}

export interface IPasswordRecover {
    exec(input: IAuthPassRetrieveInput): Promise<Result<boolean, IAuthError>>;
}
