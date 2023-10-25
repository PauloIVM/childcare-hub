import { IAuthResponse } from "@/api/auth/types";

type User = IAuthResponse["res"]["user"];

export interface UserData extends Partial<Pick<User, "email" | "userName">> {
    isLogged: boolean;
    isLoading?: boolean;
}
