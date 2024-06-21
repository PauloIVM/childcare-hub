import { IHttpQuery } from "./http-query";
import { IHttpBody } from "./http-body";
import { IHttpHeaders } from "./http-headers";

export interface IHttpValidator {
    exec(query: IHttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<boolean>;
}
