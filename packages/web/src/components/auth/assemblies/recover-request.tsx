import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function RecoverRequest() {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [successMessage, setSuccessMessage] = React.useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);
        try {
            await authApi.requestRecover({ userEmail: data.get("email") as string });
            setSuccessMessage(`Um email foi enviado para ${data.get("email") as string}. Confira para atualizar sua senha.`)
        } catch (error: any) {
            setErrorMessage(error?.message as string);
        }
        setLoading(false);
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Recuperação de senha"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Digite seu email"} />
                <Parts.Alert isActive={!!errorMessage} severity={"error"}>{errorMessage}</Parts.Alert>
                <Parts.Alert isActive={!!successMessage} severity={"success"}>{successMessage}</Parts.Alert>
                <Parts.SubmitButton isActive={true}>{"Recuperar"}</Parts.SubmitButton>
                <Parts.CircularProgress isActive={isLoading} />
            </Parts.Form>
        </Parts.Container>
    );
}
