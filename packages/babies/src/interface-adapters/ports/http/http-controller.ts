import { IHttpBody } from "./http-body";
import { IHttpQuery } from "./http-query";
import { IHttpHeaders } from "./http-headers";

export interface IHttpController {
    exec(query: IHttpQuery, body: IHttpBody, headers: IHttpHeaders): Record<string, any>;
}
