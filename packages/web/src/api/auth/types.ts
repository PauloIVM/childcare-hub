export interface ISignUpInput {
    userName: string;
    userEmail: string;
    userPassword: string;
}

export interface ILoginInput {
    userEmail: string;
    userPassword: string;
}

export interface IAuthResponse {
    userEmail?: string;
    userName?: string;
    message: string;
}
