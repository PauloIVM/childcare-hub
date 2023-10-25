import { useContext } from "react";
import { UserDataCtx } from "./context";

export function useUserData() {
    const ctx = useContext(UserDataCtx);
    if (!ctx) {
        throw new Error(`${UserDataCtx.displayName} must be provided`);
    }
    return ctx;
}
