import { BaseError } from "@/domain";
import { IHttpServer, IHttpMethods } from "@/interface-adapters/ports/http-server";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response, Express } from "express";

export class ExpressAdapter implements IHttpServer {
	app: Express;

	constructor () {
		this.app = express();
        this.app.disable("x-powered-by");
        this.app.enable("trust proxy");
		this.app.use(express.json());
		this.app.use(this.accessControl.bind(this));
        this.app.use(cookieParser());
	}

	on(method: IHttpMethods, url: string, callback: Function): void {
		this.app[method](url, async function (req: Request, res: Response) {
			try {
				const output = await callback(req.params, req.body, req.headers);
				res.json(output);
			} catch (error: any) {
                console.error(error);
                if (!(error instanceof BaseError)) {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                return res.status(error.status || 400).json({ message: error.clientMessage });
			}
		});
	}

	listen(port: number): void {
		this.app.listen(port, "::", () => {
            if (process.env.NODE_ENV !== "prod") {
                console.log(`API http server running on PORT :: ${port}`);
            }
        });
	}

    accessControl(req: Request, res: Response, next: NextFunction) {
        // TODO: use lib https://github.com/expressjs/cors
        // TODO: Condicionar para aceitar o localhost apenas se estiver rodando local...
        // res.header("Access-Control-Allow-Origin", "*");
        const allowedOrigins = ["http://localhost:3000"];
        if (req.headers.origin) {
            const origin = req.headers.origin;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.setHeader("Access-Control-Allow-Origin", origin);
            }
        }
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, DELETE, OPTIONS, PATCH",
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        );
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    }
    
}
