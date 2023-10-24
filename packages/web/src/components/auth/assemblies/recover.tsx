import * as React from "react";
import * as Parts from "../parts";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function Recover() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // TODO: Implementar chamada à api e consequênte atualização no front
        console.log({
            password1: data.get("password1"),
            password2: data.get("password2")
        });
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Defina uma nova senha"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"password1"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                <Parts.TextInput id={"password2"} autoComplete={"current-password"} label={"Repita a senha"} type={"password"} />
                <Parts.SubmitButton isActive={true}>{"Alterar senha"}</Parts.SubmitButton>
            </Parts.Form>
        </Parts.Container>
    );
}
