import { RequestHandler, Request, Response, NextFunction } from "express";
import session from "express-session";
import { TypeormStore } from "connect-typeorm";
import { sessionRepositoryFactory } from "../repositories/session-repository";
import User from "../../domain/User";

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
}

interface Settings {
    secret: string;
    cookieDomain: string;
    cookieMaxAge?: number;
}

// TODO: Implementar minha própria versão do 'express-session', vai me permitir
// tratar isso em um usecase ou domain, e sem ter q ser via middleware dependendo
// do express

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
                }).connect(
                    sessionRepositoryFactory.create().getCustomRepository(),
                ),
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

export const sessionMiddleware = authSession({
    secret: "MY_SUPER_SECRET",
    cookieDomain: "localhost",
});
