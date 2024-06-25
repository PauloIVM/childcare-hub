import { BaseError } from "@/domain";
import { IHttpServer } from "@/interface-adapters/ports/http-server";
import { HttpValidator } from "@/interface-adapters/http/validator";
import { HttpController, IHttpControllerStrategy } from "@/interface-adapters/http/controller";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response, Express } from "express";
import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository, IBabyRecordRepository } from "@/application/repositories";

export class ExpressAdapter implements IHttpServer {
	private app: Express;
    private usersGateway: IUsersGateway;
    private babiesRepository: IBabiesRepository;
    private babyRecordRepository: IBabyRecordRepository;

	constructor (
        usersGateway: IUsersGateway,
        babiesRepository: IBabiesRepository,
        babyRecordRepository: IBabyRecordRepository
    ) {
        this.usersGateway = usersGateway;
        this.babiesRepository = babiesRepository;
        this.babyRecordRepository = babyRecordRepository;
		this.app = express();
        this.app.disable("x-powered-by");
        this.app.enable("trust proxy");
		this.app.use(express.json());
		this.app.use(this.accessControl.bind(this));
        this.app.use(cookieParser());
	}

	on(
        method: Parameters<IHttpServer["on"]>[0],
        url: string,
        controllerStrategy: IHttpControllerStrategy,
        validator: HttpValidator,
    ): void {
        const controller = new HttpController(
            this.usersGateway,
            this.babiesRepository,
            this.babyRecordRepository
        ).setStrategy(controllerStrategy);
		this.app[method](url, async function (req: Request, res: Response) {
			try {
                validator.exec(req.query, req.body, req.headers);
				const output = await controller.exec(req.query, req.body, req.headers);
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
