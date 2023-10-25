import * as authApi from "@/api/auth";
import { useEffect, useState } from "react";
import { UserData } from "./types";
import { UserDataCtx } from "./context";

interface UserDataProps {
    children: React.ReactNode;
}

export default function UserDataProvider({ children }: UserDataProps) {
    const [ userData, setUserData ] = useState<UserData>({ isLogged: false, isLoading: true });
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
