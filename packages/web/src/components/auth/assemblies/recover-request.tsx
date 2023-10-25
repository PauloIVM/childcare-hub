import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Parts from "../parts";

export function RecoverRequest() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // TODO: Implementar chamada à api e consequênte atualização no front
        console.log({ email: data.get("email") });
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Recuperação de senha"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Digite seu email"} />
                <Parts.SubmitButton isActive={true}>{"Recuperar"}</Parts.SubmitButton>
            </Parts.Form>
        </Parts.Container>
    );
}
