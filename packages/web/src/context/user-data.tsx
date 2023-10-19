import { createContext, useContext } from "react";
import { useCallback, useEffect, useState } from "react";

export interface UserData {
    isLogged: boolean;
    userName: string;
}

// TODO: Implementar modo de puxar dos cookies se o user está loggado ou não.
//       Vou precisar dar uma pesquisada sobre qual a melhor maneira de implementar
//       um sisteminha de login desse tipo.
const mockedUserData: UserData = {
    isLogged: true,
    userName: "Paulo Marinho"
};

interface ContextType { userData: UserData; }

export interface UserDataProps {
    children: React.ReactNode;
}

const UserDataCtx = createContext<ContextType | null>(null);
UserDataCtx.displayName = "UserDataCtx";

export function UserDataProvider({ children }: UserDataProps) {
    const [ userData, setUserData ] = useState<UserData>(mockedUserData);
    return (
        <UserDataCtx.Provider value={{ userData }}>
            {children}
        </UserDataCtx.Provider>
    );
}

export function useUserData() {
    const ctx = useContext(UserDataCtx);
    if (!ctx) {
        throw new Error(`${UserDataCtx.displayName} must be provided`);
    }
    return ctx;
}
