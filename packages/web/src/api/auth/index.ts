import { authApi } from "../instances";
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

// INFO: Parece que a ideia é o "me" ser usado client-side, num useEffect
// por exemplo. Pode ser que isso facilite um pouco as coisas, pq aí eu posso
// voltar o contextProvider pro app...
export async function me(): Promise<Types.IAuthResponse["res"]> {
    const result = await authApi.get("/me", { withCredentials: true });
    return result.data;
}
