import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/gateways/auth";
import { useUserData } from "@/context";
import { useState } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function SignIn() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const { userData, setUserData } = useUserData();
    const router = useRouter();

    if (userData.isLogged) {
        setTimeout(() => { router.push("/"); }, 1000);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorMessage("");
        setLoading(true);
        try {
            const response = await authApi.login({
                userEmail: data.get("email") as string,
                userPassword: data.get("password") as string,
            });
            if (!response.userEmail) {
                setErrorMessage("Ops, parece que seu email ou senha não conferem.");
                setLoading(false);
                return;
            }
            setUserData({
                userName: response.userName,
                userEmail: response.userEmail,
                isLogged: true
            });
            setSuccessMessage("Login efetuado com sucesso!");
        } catch (error: any) {
            setErrorMessage(error?.message);
            setLoading(false);
        }
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Login"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Email"} />
                <Parts.TextInput id={"password"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                <Parts.Alert isActive={!!errorMessage} severity={"error"}>{errorMessage}</Parts.Alert>
                <Parts.Alert isActive={!!successMessage} severity={"success"}>{successMessage}</Parts.Alert>
                <Parts.SubmitButton isActive={!successMessage && !isLoading}>{"Entrar"}</Parts.SubmitButton>
                <Parts.CircularProgress isActive={isLoading} />
                <Parts.LinksWrapper>
                    <Parts.Link text={"Esqueceu sua senha?"} href={"/recover-request"} />
                    <Parts.Link text={"Ou, crie sua conta aqui"} href={"/sign-up"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
