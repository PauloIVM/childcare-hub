import { authApi } from "../instances";
import { AxiosRequestConfig } from "axios";
import * as Types from "./types";

// TODO: Melhorar nomes e formas de importação/exportação...

export async function register(input: Types.IRegisterInput): Promise<Types.IAuthResponse["res"]> {
    const result = await authApi.post("/register", {
        user: {
            userName: input.userName,
            email: input.email,
            password: input.password,
            passwordConfirmation: input.passwordConfirmation,
        }
    }, { withCredentials: true });
    return result.data;
}

export async function login(input: Types.ILoginInput): Promise<Types.IAuthResponse["res"]> {
    const result = await authApi.post("/login", {
        user: {
            email: input.email,
            password: input.password,
        }
    }, { withCredentials: true });
    return result.data;
}

export async function logout(): Promise<Types.IAuthResponse["res"]> {
    const result = await authApi.get("/logout", { withCredentials: true });
    return result.data;
}

// INFO: Ainda estou um pouco na dúvida se é melhor usar esse "me" no client ou server
// do front. Caso eu decida por manter no client, posso remover esse "cookie" dos params
export async function me(cookie?: string): Promise<Types.IAuthResponse["res"]> {
    const config: AxiosRequestConfig = { withCredentials: true };
    if (cookie) config["headers"] = { Cookie: cookie };
    const result = await authApi.get("/me", config);
    return result.data;
}
