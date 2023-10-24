import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import * as authApi from "@/api/auth";
import { IAuthResponse } from "@/api/auth/types";

type User = IAuthResponse["res"]["user"];

// TODO: Essa interface deveria fazer um pick e omitir o 'id'? Dúvida, o 'id'
// da sessão é enviado ao front, isso não é um sinal de que eu preciso persistir esse
// id no client de alguma forma???
export interface UserData extends Partial<User> {
    isLogged: boolean;
}

interface ContextType {
    userData: UserData;
    setUserData: Dispatch<SetStateAction<UserData>>;
}

export interface UserDataProps {
    children: React.ReactNode;
}

const UserDataCtx = createContext<ContextType | null>(null);
UserDataCtx.displayName = "UserDataCtx";

// TODO: Melhoria para o futuro... se eu disparar server-side a request getMe com o
// withCredentials, o servidor do front propaga os cookies até a api? Pq se sim, aí
// eu posso evitar um flick, já carregando a página com um initialUserData. Pra fazer
// isso, o chato é que aparentemente em cada página eu tenho que fazer a request...
// olhar direitinho como criar um wrapper com um getServerSideProps
export function UserDataProvider({ children }: UserDataProps) {
    const [ userData, setUserData ] = useState<UserData>({ isLogged: false });
    useEffect(() => {
        authApi.me()
            .then(({ user }) => {
                console.log(user);
                setUserData({ email: user.email, userName: user.userName, isLogged: true });
            })
            .catch((err) => {
                setUserData({ isLogged: false });
            });
    }, []);
    return (
        <UserDataCtx.Provider value={{ userData, setUserData }}>
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
