import { authApi } from "../instances";
import Cookie from "js-cookie";
import * as Types from "./types";

// TODO: Estou fazendo o gerenciamento dos cookies aqui nas requests. Isso força
//       para que elas só funcionem client-side. Talvez eu deva mudar o nome dessa
//       pasta que chamei de 'api', ou pensar em uma forma decente de remover isso
//       daqui.

export async function signUp(input: Types.ISignUpInput): Promise<Types.IAuthResponse> {
    const result = await authApi.post("/sign-up", {
        user: {
            name: input.userName,
            email: input.userEmail,
            password: input.userPassword,
        }
    });
    const { token, userEmail, userName, message } = result.data;
    Cookie.set("np_user", token); 
    return { userEmail, userName, message };
}

export async function login(input: Types.ILoginInput): Promise<Types.IAuthResponse> {
    const result = await authApi.post("/login", {
        user: {
            email: input.userEmail,
            password: input.userPassword,
        }
    });
    const { token, userEmail, userName, message } = result.data;
    Cookie.set("np_user", token); 
    return { userEmail, userName, message };
}

export function logout() {
    Cookie.remove("np_user"); 
}
