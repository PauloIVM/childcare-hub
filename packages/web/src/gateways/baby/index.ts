import { babyApi } from "../instances";
import Cookie from "js-cookie";
import * as Types from "./types";

export async function fetchBabies(): Promise<Types.IFetchBabiesResponse> {
    const token = Cookie.get("np_user") || "";
    const result = await babyApi.get("/", {
        headers: { Authorization: `Bearer ${token}` }
    });
    return {
        message: result.data.message,
        babies: result.data.babies?.map((b: any) => ({
            id: b.id,
            name: b.name,
            gender: b.gender,
            birthday: new Date(b.birthday),
        }))
    };
}
