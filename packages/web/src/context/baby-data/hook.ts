import { useContext } from "react";
import { BabyDataCtx } from "./context";

export function useBabyData() {
    const ctx = useContext(BabyDataCtx);
    if (!ctx) {
        throw new Error(`${BabyDataCtx.displayName} must be provided`);
    }
    return ctx;
}
