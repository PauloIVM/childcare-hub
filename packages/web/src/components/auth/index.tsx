import * as React from "react";
import * as Assemblies from "./assemblies";

interface Props {
    assembly: "sign-in" | "sign-up" | "recover" | "recover-request";
}

export function Auth({ assembly }: Props) {
    if (assembly === "sign-in") {
        return (<Assemblies.SignIn />);
    }
    if (assembly === "sign-up") {
        return (<Assemblies.SignUp />);
    }
    if (assembly === "recover") {
        return (<Assemblies.Recover />);
    }
    if (assembly === "recover-request") {
        return (<Assemblies.RecoverRequest />);
    }
}
