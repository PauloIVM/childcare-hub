export interface IHttpServer {
	on(method: IHttpMethods, url: string, callback: IHttpServerCallback): void;
	listen(port: number): void;
}

export type IHttpMethods = "post" | "get" | "put" | "delete" | "patch";

type IHttpServerCallback = (params: IParams, body: IBody, headers: IHeaders) => Record<string, any> | void;

type IParams = Record<string, any>;

type IBody = Record<string, any>;

interface IHeaders {
    location?: string;
    host?: string;
    authorization?: string;
    cookie?: string;
    origin?: string;
};
