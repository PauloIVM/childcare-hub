export interface IRegisterInput {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IAuthResponse {
    res: {
        id: string;
        user: {
            id: string;
            userName: string;
            email: string;
        }
    },
    err: {
        status: number;
        message: string;
        errors: Record<string, string>;
    }
}
