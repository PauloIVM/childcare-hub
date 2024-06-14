import { userApi } from "../instances";
import Cookie from "js-cookie";
import * as Types from "./types";
import { AxiosRequestConfig } from "axios";

// TODO: Parece q o RabbitMQ não está persistindo as mensagens.
// TODO: Ajustar nomes para últimas alterações feitas nos endpoitns.
// TODO: Em tese, essas funcs deveria implementar a interface de uma camada mais interna,
//       e não elas mesmas definirem qual é o seu retorno, pra então seguir a regra da
//       dependência.

export async function signUp(input: Types.ISignUpInput): Promise<Types.IAuthResponse> {
    try {
        const result = await userApi.post("/", {
            user: {
                name: input.userName,
                email: input.userEmail,
                password: input.userPassword,
            }
        });
        const { token, userEmail, userName, message } = result.data;
        Cookie.set("np_user", token); 
        return { userEmail, userName, message };
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function login(input: Types.ILoginInput): Promise<Types.IAuthResponse> {
    try {
        const result = await userApi.post("/login", {
            user: {
                email: input.userEmail,
                password: input.userPassword,
            }
        });
        const { token, userEmail, userName, message } = result.data;
        Cookie.set("np_user", token); 
        return { userEmail, userName, message };
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function requestRecover(input: Types.IRecoverRequestInput): Promise<void> {
    try {
        await userApi.post("/request-recover", {
            user: { email: input.userEmail }
        });   
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function recover(input: Types.IRecoverInput): Promise<Types.IAuthResponse> {
    const token = input.token || Cookie.get("np_user") || "";
    const config: AxiosRequestConfig = { headers: {
        Authorization: `Bearer ${token}`
    }};
    try {
        const result = await userApi.patch("/recover", {
            user: { password: input.userPassword },
        }, config);
        const { token: resToken, userEmail, userName, message } = result.data;
        Cookie.set("np_user", resToken); 
        return { userEmail, userName, message };
    } catch (error: any) {
        throw new Error(error?.response?.data?.message);
    }
}

export async function getUser(): Promise<Types.IGetUserResponse> {
    const token = Cookie.get("np_user") || "";
    const config: AxiosRequestConfig = { headers: {
        Authorization: `Bearer ${token}`
    }};
    const result = await userApi.get("/", config);
    return result.data;
}

export function logout() {
    Cookie.remove("np_user"); 
}
