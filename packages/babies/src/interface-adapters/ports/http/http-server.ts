import { IHttpMethods } from "./http-methods";
import { IHttpController } from "./http-controller";
import { IHttpValidator } from "./http-validator";

export interface IHttpServer {
	on(
        method: IHttpMethods,
        url: string,
        controller: IHttpController,
        validator: IHttpValidator
    ): void;
	listen(port: number): void;
}
