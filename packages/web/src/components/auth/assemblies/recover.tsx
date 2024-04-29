import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";
import { useUserData } from "@/context";

export function Recover() {
    const router = useRouter();
    const { token } = router.query;
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [successMessage, setSuccessMessage] = React.useState<string>("");
    const { userData, setUserData } = useUserData();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);
        try {
            const password1 = data.get("password1") as string;
            const password2 = data.get("password2") as string;
            if (password1 !== password2) {
                setErrorMessage("A senha e a confirmação de senha devem ser iguais.");
                setLoading(false);
                return;
            }
            const response = await authApi.recover({
                userPassword: password1,
                token: userData.isLogged ? "" : token as string
            });
            if (!response.userEmail) {
                setErrorMessage("Ocorreu um erro na alteração da senha. Tente novamente.");
                setLoading(false);
                return;
            }
            setUserData({
                userName: response.userName,
                userEmail: response.userEmail,
                isLogged: true
            });
            setSuccessMessage("Senha atualizada com sucesso!");
            setTimeout(() => { router.push("/"); }, 1000);
        } catch (error: any) {
            setErrorMessage(error?.message as string);
        }
        setLoading(false);
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Defina uma nova senha"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"password1"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                <Parts.TextInput id={"password2"} autoComplete={"current-password"} label={"Repita a senha"} type={"password"} />
                <Parts.Alert isActive={!!errorMessage} severity={"error"}>{errorMessage}</Parts.Alert>
                <Parts.Alert isActive={!!successMessage} severity={"success"}>{successMessage}</Parts.Alert>
                <Parts.SubmitButton isActive={!successMessage && !isLoading}>{"Alterar senha"}</Parts.SubmitButton>
                <Parts.CircularProgress isActive={isLoading} />
            </Parts.Form>
        </Parts.Container>
    );
}
