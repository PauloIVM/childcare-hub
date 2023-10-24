import { IAuthError } from "../types";
import { Result } from "../../../utils";

export interface IAuthPassRecoverInput {
    email: string;
}

export interface IPasswordRecover {
    exec(input: IAuthPassRecoverInput): Promise<Result<boolean, IAuthError>>;
}
