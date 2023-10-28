import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/api/auth";
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
        // TODO: Desenvolver lógica do remember (acho q está lembrando independente de marcar
        // ou n).
        const checkboxValue = (document?.getElementById("remember") as any)?.checked;
        setErrorMessage("");
        setLoading(true);
        try {
            const response = await authApi.login({
                email: data.get("email") as string,
                password: data.get("password") as string,
            });
            if (!response.user?.email) {
                setErrorMessage("Ops, parece que seu email ou senha não conferem.");
                return;
            }
            setUserData({
                userName: response.user.userName,
                email: response.user.email,
                isLogged: true
            });
            setSuccessMessage("Login efetuado com sucesso!");
        } catch (error: any) {
            const errors: Record<string, string> = error?.response?.data?.errors;
            const message = Object.values(errors).join(" ");
            setErrorMessage(message);
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
                <Parts.Checkbox id={"remember"} label={"Lembrar senha"} />
                <Parts.Alert isActive={!!errorMessage} severity={"error"}>{errorMessage}</Parts.Alert>
                <Parts.Alert isActive={!!successMessage} severity={"success"}>{successMessage}</Parts.Alert>
                <Parts.SubmitButton isActive={!successMessage && !isLoading}>{"Entrar"}</Parts.SubmitButton>
                <Parts.CircularProgress isActive={isLoading} />
                <Parts.LinksWrapper>
                    <Parts.Link text={"Esqueceu sua senha?"} href={"/recover"} />
                    <Parts.Link text={"Ou, crie sua conta aqui"} href={"/sign-up"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
