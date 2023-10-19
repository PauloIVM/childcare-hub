import * as React from "react";
import * as Parts from "../parts";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function SignIn() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const checkboxValue = (document?.getElementById("remember") as any)?.checked;
        // TODO: Implementar chamada à api e consequênte atualização no front
        console.log({
            email: data.get("email"),
            password: data.get("password"),
            remember: checkboxValue
        });
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Login"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Email"} />
                <Parts.TextInput id={"password"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                <Parts.Checkbox id={"remember"} label={"Lembrar senha"} />
                <Parts.SubmitButton>{"Entrar"}</Parts.SubmitButton>
                <Parts.LinksWrapper>
                    <Parts.Link text={"Esqueceu sua senha?"} href={"/recover"} />
                    <Parts.Link text={"Ou, crie sua conta aqui"} href={"/sign-up"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
