import { Me } from "./me";
import { Login } from "./login";
import { Logout } from "./logout";
import { Register } from "./register";
import { PasswordRecover } from "./password-recover";
import { InjectorFactory } from "../../utils";
import { userRepositoryFactory } from "../../infra/repositories/user-repository";

export const meFactory = new InjectorFactory(Me);
export const logoutFactory = new InjectorFactory(Logout);
export const loginFactory = new InjectorFactory(Login, [userRepositoryFactory]);
export const registerFactory = new InjectorFactory(Register, [
    userRepositoryFactory,
]);
export const passwordRecoverFactory = new InjectorFactory(PasswordRecover, [
    userRepositoryFactory,
]);
export * from "./types";
export * from "./login/types";
export * from "./logout/types";
export * from "./me/types";
export * from "./password-recover/types";
export * from "./register/types";
