import { Session } from "express-session";
import { Result, Maybe } from "../../utils";

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

// TODO: Será se é realmente bom ter um arquivão de interfaces? Acho que acaba sendo
// melhor cada interface junto do seu respectivo componente. Mudar isso depois
interface AuthUserSession {
    id: Maybe<string>;
    user: Maybe<AuthUser>;
}

interface AuthError {
    status?: number;
    message: string;
    errors?: {
        [key: string]: string | number | boolean;
    };
}

export interface ILogin {
    exec(input: AuthLoginInput): Promise<Result<AuthUserSession, AuthError>>;
}
