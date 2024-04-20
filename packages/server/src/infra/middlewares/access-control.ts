import { Request, Response, NextFunction } from "express";

export function accessControlMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
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
