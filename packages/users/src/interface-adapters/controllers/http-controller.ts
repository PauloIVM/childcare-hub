import * as Usecases from "@/application/usecases";
import { IHttpServer } from "@/interface-adapters/ports/http-server";
import { UserRepository } from "@/interface-adapters/adapters/repositories";
import { IUsersDataMapper } from "@/interface-adapters/ports/data-mappers";
import { EmailGateway } from "@/interface-adapters/adapters/gateways";

export class HttpController {
	constructor (
        httpServer: IHttpServer,
        usersMapper: IUsersDataMapper
    ) {
		httpServer.on("post", "/user/login", async function (params, body, headers) {
			const { email, password } = body?.user || {};
            const usecase = new Usecases.LoginUsecase(new UserRepository(usersMapper));
            const { token, userEmail, userName } = await usecase.exec(
                email,
                password,
                new Date()
            );
            return { token, userEmail, userName, message: "ok"  };
		});

        httpServer.on("post", "/user", async function (params, body, headers) {
            const { email, name, password } = body?.user || {};
            const usecase = new Usecases.SignUpUsecase(new UserRepository(usersMapper));
            const { token, userEmail, userName } = await usecase.exec({
                email,
                name,
                password
            }, new Date());
            return { token, userEmail, userName, message: "ok" };
		});

        httpServer.on("post", "/user/request-recover", async function (params, body, headers) {
			const { email } = body?.user || {};
            const usecase = new Usecases.RequestRecoverUsecase(
                new UserRepository(usersMapper),
                EmailGateway.getInstance()
            );
            await usecase.exec(email);
            return { message: "Email sent." };
		});

        httpServer.on("patch", "/user/recover", async function (params, body, headers) {
			const { password } = body?.user || {};
            const token = headers?.authorization?.split(' ')[1] || "";
            const usecase = new Usecases.RecoverPasswordUsecase(new UserRepository(usersMapper));
            const { token: newToken, userEmail, userName } = await usecase.exec(password, token);
            return { token: newToken, userEmail, userName, message: "Password updated." };
		});

        // TODO: Essa rota precisa ser 'internal', para n expor o user-id para o client. Trafegar
        //       o user-id no rabbitmq n vai ser tao problematico, mas nos endpoints http precisa
        //       ter mais cuidado.
        httpServer.on("get", "/user/user-id", async function (params, body, headers) {
			const token = headers?.authorization?.split(' ')[1] || "";
            const verifyUsecase = new Usecases.VerifyUsecase();
            const { userId } = verifyUsecase.exec(token);
            if (!userId) { return {}; }
            return { userId: userId, message: "ok" };
		});

        httpServer.on("get", "/user", async function (params, body, headers) {
			const token = headers?.authorization?.split(' ')[1] || "";
            const verifyUsecase = new Usecases.VerifyUsecase();
            const { userId } = verifyUsecase.exec(token);
            if (!userId) { return {}; }
            const getUserUsecase = new Usecases.GetUserUsecase(new UserRepository(usersMapper));
            const user = await getUserUsecase.exec(userId);
            return {
                userName: user.userName,
                userEmail: user.email,
                message: "ok"
            };
		});
	}
}
