import { BaseError } from "@/domain";
import { IHttpHeaders } from "@/interface-adapters/http/dtos";

export class HeadersValidator {
    private hasBearerToken: boolean;

    constructor () {}

    setupBearerTokenValidator(): this {
        this.hasBearerToken = true;
        return this;
    }

    exec(headers: IHttpHeaders) {
        if (this.hasBearerToken && !headers.authorization?.split(' ')?.[1]) {
            this.validateBearerToken(headers);
        }
    }

    private validateBearerToken(headers: IHttpHeaders) {
        if (headers.authorization?.split(' ')?.[1]) return;
        throw new BaseError({
            message: "Token required.",
            clientMessage: "Token de autenticação não fornecido.",
            status: 401
        });
    }
}
