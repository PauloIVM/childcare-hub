import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import { Avatar } from "@mui/material";
import { useUserData } from "@/context";
import { useState } from "react";
import { useRouter } from "next/router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// TODO: Implementar confirmação de email tbm aqui na criação, e não apenas no recover.

export function SignUp() {
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
        const checkboxValue = (document?.getElementById("agree") as any)?.checked;
        setErrorMessage("");
        if (!checkboxValue) {
            setErrorMessage("Por favor, leia os nossos termos de uso e marque o checkbox acima para prosseguir com o cadastro.");
            return;
        }
        setLoading(true);
        try {
            // TODO: Parece que o "register" me responde com o sessionId... eu preciso pegar esse
            // valor e usar de alguma forma no client? Conferir no código do MC. Aparentemente n,
            // acredito que talvez isso não devesse vir na api? Apenas nos cookies? Parece que está
            // enviando outro id tbm, pode ser uma falha de segurança.
            const response = await authApi.register({
                userName: data.get("username") as string,
                email: data.get("email") as string,
                password: data.get("password") as string,
                passwordConfirmation: data.get("passwordConfirmation") as string,
            });
            setUserData({
                userName: response.user.userName,
                email: response.user.email,
                isLogged: true
            });
            setSuccessMessage("Cadastro realizado com sucesso! Estamos te redirecionando para a página inicial.");
        } catch (error: any) {
            // TODO: Agora eu já posso tipar um pouco melhor esse error... talvez transformar em um
            // then() e catch()... ou... adicionar o middleware de error na api...
            const errors: Record<string, string> = error?.response?.data?.errors;
            const message = Object.values(errors).join(" ");
            setErrorMessage(message);
            setLoading(false);
        }
    };

    return (
        <Parts.Container>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Parts.Title>{"Cadastrar"}</Parts.Title>
            <Parts.Form onSubmit={handleSubmit}>
                <Parts.TextInput id={"username"} autoComplete={"username"} label={"Nome de usuário"} />
                <Parts.TextInput id={"email"} autoComplete={"email"} label={"Email"} />
                <Parts.TextInput id={"password"} autoComplete={"current-password"} label={"Senha"} type={"password"} />
                <Parts.TextInput id={"passwordConfirmation"} autoComplete={"current-password"} label={"Confirme sua senha"} type={"password"} />
                {/* TODO: Criar link pra uma página com os termos, melhorar estilos... */}
                <Parts.Checkbox id={"agree"} label={"Estou de acordo com os termos de uso."} />
                <Parts.Alert isActive={!!errorMessage} severity={"error"}>{errorMessage}</Parts.Alert>
                <Parts.Alert isActive={!!successMessage} severity={"success"}>{successMessage}</Parts.Alert>
                <Parts.SubmitButton isActive={!successMessage && !isLoading}>{"Criar cadastro"}</Parts.SubmitButton>
                <Parts.CircularProgress isActive={isLoading} />
                <Parts.LinksWrapper>
                    <Parts.Link text={"Já possui uma conta? Faça o login aqui."} href={"/sign-in"} />
                    <Parts.Link text={"Já possui uma conta e esqueceu a senha?"} href={"/recover"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
