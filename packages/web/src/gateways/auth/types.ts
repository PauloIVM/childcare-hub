export interface ISignUpInput {
    userName: string;
    userEmail: string;
    userPassword: string;
}

export interface ILoginInput {
    userEmail: string;
    userPassword: string;
}

export interface IRecoverRequestInput {
    userEmail: string;
}

export interface IRecoverInput {
    userPassword: string;
    token?: string;
}

export interface IAuthResponse {
    userEmail?: string;
    userName?: string;
    message: string;
}
