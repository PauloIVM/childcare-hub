import { IUsersGateway } from "@/application/gateways";
import { BaseError } from "@/domain";
import axios, { AxiosRequestConfig } from "axios";

export class UsersGateway implements IUsersGateway {
    constructor() {}

    // IDEIA: Seria interessante eu fazer um sistema de regerar o token sem o user ter que refazer
    //        o login? Exemplo: Se o user acessa com um token já com mais de meia-vida, então gera
    //        um novo pra ele e já salva sozinho no navegador... aí heavy-users não teriam que ficar
    //        refazendo login, ao passo que o token seria periodicamente atualizado... mantendo algum
    //        nível de segurança.

    async getUserId(token: string): Promise<string> {
        try {
            const config: AxiosRequestConfig = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const result = await axios.get("http://localhost:3003/user/user-id", config);
            const userId = result.data.userId;
            if (!userId) throw new Error();
            return result.data.userId;
        } catch (error) {
            throw new BaseError({
                message: "Unauthorized user.",
                clientMessage: "Falha na autenticação do usuário.",
                status: 401
            });
        }
    }
}