import * as authApi from "@/api/auth";
import { useEffect, useState } from "react";
import { UserData } from "./types";
import { UserDataCtx } from "./context";

interface UserDataProps {
    children: React.ReactNode;
}

// INFO: Uma outra opção pra evitar o flick abaixo é fazer tipo um anti-flicker, onde
// eu mostro a logo e um símbolo carregando... e daí o login é feito por baixo da tela.
// Se a opção desse loading na página inteira for muito ruim pra SEO, posso ainda usar
// um skeleton individual em cada carinha que depende do login.

// TODO: Melhoria para o futuro... se eu disparar server-side a request getMe com o
// withCredentials, o servidor do front propaga os cookies até a api? Pq se sim, aí
// eu posso evitar um flick, já carregando a página com um initialUserData. Pra fazer
// isso, o chato é que aparentemente em cada página eu tenho que fazer a request...
// olhar direitinho como criar um wrapper com um getServerSideProps
export default function UserDataProvider({ children }: UserDataProps) {
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
