import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import { useUserData } from "@/context";
import { useRouter } from "next/router";

export function SignOut() {
    const { userData, setUserData } = useUserData();
    const router = useRouter();

    if (!userData.isLogged) {
        return <></>;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await authApi.logout();
            setUserData({ isLogged: false });
        } catch (error: any) {
            setUserData({ isLogged: false });
            console.error(error);
        }
        router.push("/");
    };

    return (
        <Parts.Form onSubmit={handleSubmit}>
            {/*
                TODO: Criar tbm uma forma do user pedir pra apagar a conta...
                Acho que o melhor é ser um botão e não um checkbox... criar outro botão
                e não usar o de submit, nem mesmo para o "sair".
            */}
            <Parts.Checkbox id={"delete"} label={"Excluir minha conta ao sair."} />
            <Parts.SubmitButton isActive={true}>{"Sair"}</Parts.SubmitButton>
        </Parts.Form>
    );
}
