import { userApi } from "../instances";
import { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import * as Types from "./types";

export async function getUser(): Promise<Types.IGetUserResponse> {
    const token = Cookie.get("np_user") || "";
    const config: AxiosRequestConfig = { headers: {
        Authorization: `Bearer ${token}`
    }};
    const result = await userApi.get("/me", config);
    return result.data;
}
