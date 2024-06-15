import { createContext, Dispatch, SetStateAction } from "react";
import { BabyData } from "./types";

interface ContextType {
    babyData: BabyData;
    setBabyData: Dispatch<SetStateAction<BabyData>>;
}

const BabyDataCtx = createContext<ContextType | null>(null);
BabyDataCtx.displayName = "BabyDataCtx";

export { BabyDataCtx };
