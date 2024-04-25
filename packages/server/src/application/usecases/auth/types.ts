import { Session } from "express-session";
import { Maybe } from "@/utils";

interface IAuthUser {
    id?: string;
    userName?: string;
    email?: string;
}

export interface IAuthSessionInput extends Session {
    user?: Maybe<IAuthUser>;
}

export interface IAuthUserSession {
    id: Maybe<string>;
    user: Maybe<IAuthUser>;
}

export interface IAuthError {
    status?: number;
    message: string;
    errors?: {
        [key: string]: string | number | boolean;
    };
}
