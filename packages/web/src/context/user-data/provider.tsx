import { getUser } from "@/gateways/user";
import { useEffect, useState } from "react";
import { UserData } from "./types";
import { UserDataCtx } from "./context";

interface UserDataProps {
    children: React.ReactNode;
}

export default function UserDataProvider({ children }: UserDataProps) {
    const [ userData, setUserData ] = useState<UserData>({ isLogged: false, isLoading: true });
    useEffect(() => {
        getUser()
            .then(({ userEmail, userName }) => {
                if (!userEmail || !userName) {
                    setUserData({ isLogged: false });
                    return;
                }
                setUserData({ userEmail, userName, isLogged: true });
            })
            .catch(() => {
                setUserData({ isLogged: false });
            });
    }, []);
    return (
        <UserDataCtx.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataCtx.Provider>
    );
}
