import { Session } from "express-session";
import { Maybe } from "../../utils";

export interface AuthUser {
    id?: string;
    userName?: string;
    email?: string;
}

export interface AuthPassRecoverInput {
    email: string;
}

export interface AuthSessionInput extends Session {
    user?: Maybe<AuthUser>;
}

export interface AuthLoginInput {
    email?: string;
    password?: string;
    session: AuthSessionInput;
}

export interface AuthRegisterInput {
    user: Maybe<{
        userName: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }>;
    session: AuthSessionInput;
}
