import * as Auth from "@/application/usecases/auth";
import * as User from "@/application/usecases/user";
import { IHttpServer } from "@/interface-adapters/ports/http-server";
import { UserRepository } from "@/interface-adapters/adapters/repositories";
import { IUsersDataMapper } from "@/interface-adapters/ports/data-mappers";
import { EmailGateway } from "@/interface-adapters/adapters/gateways";

export class HttpController {
	constructor (
        httpServer: IHttpServer,
        usersMapper: IUsersDataMapper
    ) {
		httpServer.on("post", "/auth/login", async function (params, body, headers) {
			const { email, password } = body?.user || {};
            const usecase = new Auth.LoginUsecase(new UserRepository(usersMapper));
            const { token, userEmail, userName } = await usecase.exec(
                email,
                password,
                new Date()
            );
            return { token, userEmail, userName, message: "ok"  };
		});

        httpServer.on("post", "/auth/sign-up", async function (params, body, headers) {
            const { email, name, password } = body?.user || {};
            const usecase = new Auth.SignUpUsecase(new UserRepository(usersMapper));
            const { token, userEmail, userName } = await usecase.exec({
                email,
                name,
                password
            }, new Date());
            return { token, userEmail, userName, message: "ok" };
		});

        httpServer.on("post", "/auth/request-recover", async function (params, body, headers) {
			const { email } = body?.user || {};
            const usecase = new Auth.RequestRecoverUsecase(
                new UserRepository(usersMapper),
                EmailGateway.getInstance()
            );
            await usecase.exec(email);
            return { message: "Email sent." };
		});

        httpServer.on("post", "/auth/recover", async function (params, body, headers) {
			const { password } = body?.user || {};
            const token = headers?.authorization?.split(' ')[1] || "";
            const usecase = new Auth.RecoverPasswordUsecase(new UserRepository(usersMapper));
            const { token: newToken, userEmail, userName } = await usecase.exec(password, token);
            return { token: newToken, userEmail, userName, message: "Password updated." };
		});

        // TODO: Mudar o nome para /auth/user.. ou /auth.. ou algo assim...
        httpServer.on("get", "/user/me", async function (params, body, headers) {
			const token = headers?.authorization?.split(' ')[1] || "";
            const verifyUsecase = new Auth.VerifyUsecase();
            const { userId } = verifyUsecase.exec(token);
            if (!userId) { return {}; }
            const getUserUsecase = new User.GetUserUsecase(new UserRepository(usersMapper));
            const user = await getUserUsecase.exec(userId);
            return {
                userName: user.userName,
                userEmail: user.email,
                message: "ok"
            };
		});
	}
}
