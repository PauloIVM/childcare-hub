import { IHttpControllerStrategy } from "@/interface-adapters/http/controller";
import { HttpValidator } from "@/interface-adapters/http/validator";

export interface IHttpServer {
	on(
        method: "post" | "get" | "put" | "delete" | "patch",
        url: string,
        controllerStrategy: IHttpControllerStrategy,
        validators: HttpValidator
    ): void;
	listen(port: number): void;
}
