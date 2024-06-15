import { fetchBabies } from "@/gateways/baby";
import { useEffect, useState } from "react";
import { BabyData } from "./types";
import { BabyDataCtx } from "./context";
import { useUserData } from "../user-data";

interface BabyDataProps {
    children: React.ReactNode;
}

export default function BabyDataProvider({ children }: BabyDataProps) {
    const { userData } = useUserData();
    const [ babyData, setBabyData ] = useState<BabyData>({ babies: [] });

    useEffect(() => {
        if (!userData.isLogged) return;
        fetchBabies()
            .then((response) => {
                setBabyData({
                    selectedBabyId: response.babies[0].id,
                    babies: response.babies
                })
            })
            .catch(() => {
                setBabyData({
                    babies: []
                })
            })
    }, [userData.userEmail, userData.isLogged]);

    return (
        <BabyDataCtx.Provider value={{ babyData, setBabyData }}>
            {children}
        </BabyDataCtx.Provider>
    );
}
