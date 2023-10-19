import * as React from "react";
import * as Parts from "../parts";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function SignUp() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const checkboxValue = (document?.getElementById("agree") as any)?.checked;
        // TODO: Implementar chamada à api e consequênte atualização no front
        console.log({
            email: data.get("email"),
            username: data.get("username"),
            password: data.get("password"),
            agree: checkboxValue
        });
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Cadastrar"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"username"} autoComplete={"username"} label={"Nome de usuário"} />
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Email"} />
                <Parts.TextInput id={"password"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                {/* TODO: Criar link pra uma página com os termos, melhorar estilos... */}
                <Parts.Checkbox id={"agree"} label={"Estou de acordo com os termos de uso."} />
                <Parts.SubmitButton>{"Criar cadastro"}</Parts.SubmitButton>
                <Parts.LinksWrapper>
                    <Parts.Link text={"Já possui uma conta? Faça o login aqui."} href={"/sign-in"} />
                    <Parts.Link text={"Já possui uma conta e esqueceu a senha?"} href={"/recover"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
