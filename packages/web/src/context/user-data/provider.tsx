import { getUser } from "@/gateways/auth";
import { fetchBabies } from "@/gateways/baby";
import { useEffect, useState } from "react";
import { UserData } from "./types";
import { UserDataCtx } from "./context";

interface UserDataProps {
    children: React.ReactNode;
}

export default function UserDataProvider({ children }: UserDataProps) {
    const [ userData, setUserData ] = useState<UserData>({ isLogged: false, isLoading: true });
    useEffect(() => {
        (async () => {
            try {
                const { userEmail, userName } = await getUser();
                if (!userEmail || !userName) {
                    setUserData({ isLogged: false });
                    return;
                }
                const { babies } = await fetchBabies();
                if (!babies?.length) {
                    setUserData({ isLogged: false });
                    return;
                }
                setUserData({
                    userEmail,
                    userName,
                    currBabyId: babies[0].id,
                    isLogged: true
                });
            } catch (error) {
                setUserData({ isLogged: false });
            }
        })()
    }, []);
    return (
        <UserDataCtx.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataCtx.Provider>
    );
}
