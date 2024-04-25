import { LoginController } from "./login";
import { LogoutController } from "./logout";
import { MeController } from "./me";
import { PasswordRecoverController } from "./password-recover";
import { RegisterController } from "./register";
import { InjectorFactory } from "@/utils";
import * as authUsecases from "@/application/usecases/auth";

export const loginControllerFactory = new InjectorFactory(LoginController, [
    authUsecases.loginFactory,
]);

export const logoutControllerFactory = new InjectorFactory(LogoutController, [
    authUsecases.logoutFactory,
]);

export const meControllerFactory = new InjectorFactory(MeController, [
    authUsecases.meFactory,
]);

export const passwordRecoverControllerFactory = new InjectorFactory(
    PasswordRecoverController,
    [authUsecases.passwordRecoverFactory],
);

export const registerControllerFactory = new InjectorFactory(
    RegisterController,
    [authUsecases.registerFactory],
);
