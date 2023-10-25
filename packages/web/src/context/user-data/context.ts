import { createContext, Dispatch, SetStateAction } from "react";
import { UserData } from "./types";

interface ContextType {
    userData: UserData;
    setUserData: Dispatch<SetStateAction<UserData>>;
}

const UserDataCtx = createContext<ContextType | null>(null);
UserDataCtx.displayName = "UserDataCtx";

export { UserDataCtx };
