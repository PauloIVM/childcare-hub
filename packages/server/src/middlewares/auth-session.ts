import { RequestHandler, Request, Response, NextFunction } from "express";
import session from "express-session";
import { TypeormStore } from "connect-typeorm";
import { sessionRepositoryFactory } from "../repositories/session-repository";

interface Settings {
    secret: string;
    cookieDomain: string;
    cookieMaxAge?: number;
}

function authSession({
    secret,
    cookieDomain,
    cookieMaxAge = 2000000,
}: Settings) {
    let handler: RequestHandler = null;

    function getHandler() {
        // NOTE: This handler must be lazily evaluated
        if (!handler) {
            handler = session({
                secret,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: false,
                    maxAge: cookieMaxAge,
                    domain: cookieDomain,
                },
                store: new TypeormStore({
                    cleanupLimit: 10,
                    limitSubquery: false,
                }).connect(sessionRepositoryFactory.create()),
            });
        }
        return handler;
    }

    return (req: Request, res: Response, next: NextFunction) => {
        const sessionHandler = getHandler();
        return sessionHandler(req, res, next);
    };
}

// TODO: Preciso estudar um pouco pra que serve esse 'secret'... ele existe apenas
// no servidor? Depois q eu tiver um domínio, mudar tbm isso aqui...

// INFO: Parece que nesse link https://www.npmjs.com/package/express-session#secret
// dá algumas dicas desse 'secret'. Pelo q eu entendi, se eu simplesmente mudar a string,
// vai fechar a sessão de todos os usuários. Mas, se eu usar um array de secrets, e for
// adicionando novos secrets, então isso não rolaria. Preciso entender melhor, e entender
// inclusive as consequências de ter esse cara vazado...

const sessionMiddleware = authSession({
    secret: "MY_SUPER_SECRET",
    cookieDomain: "localhost",
});

export default sessionMiddleware;
