import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import { Avatar } from "@mui/material";
import { useUserData } from "@/context";
import { useState } from "react";
import { useRouter } from "next/router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
            const password = data.get("password") as string;
            const passwordConfirmation = data.get("passwordConfirmation") as string;
            if (password !== passwordConfirmation) {
                setErrorMessage("A senha e a confirmação de senha devem ser iguais.");
                setLoading(false);
                return;
            }
            const response = await authApi.signUp({
                userName: data.get("username") as string,
                userEmail: data.get("email") as string,
                userPassword: data.get("password") as string
            });
            setUserData({
                userName: response.userName,
                userEmail: response.userEmail,
                isLogged: true
            });
            setSuccessMessage("Cadastro realizado com sucesso! Estamos te redirecionando para a página inicial.");
        } catch (error: any) {
            // TODO: Agora eu já posso tipar um pouco melhor esse error... talvez transformar em um
            // then() e catch()... ou... adicionar o middleware de error na api...
            setErrorMessage(error?.response?.data?.message || "");
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
                    <Parts.Link text={"Já possui uma conta e esqueceu a senha?"} href={"/recover-request"} />
                </Parts.LinksWrapper>
            </Parts.Form>
        </Parts.Container>
    );
}
