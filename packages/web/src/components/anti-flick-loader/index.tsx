import * as React from "react";
import { useUserData } from "@/context";
import Image from "next/image";
import { LinearProgress } from "@mui/material";

export function AntiFlickLoader() {
    const { userData } = useUserData();
    if (!userData.isLoading) return <></>;
    return (
        <div
            style={{
                zIndex: 1000,
                position: "fixed",
                width: "100vw",
                height: "100vh",
                background: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Image src={"/logo-small.svg"} alt={"logo"} width={180} height={80} />
            <LinearProgress sx={{ width: "60%" }} color={"inherit"} />
        </div>
    );
}
