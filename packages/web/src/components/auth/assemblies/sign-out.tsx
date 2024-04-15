import * as React from "react";
import * as Parts from "../parts";
import * as authApi from "@/api/auth";
import { useUserData } from "@/context";
import { useRouter } from "next/router";
import { useState } from "react";

export function SignOut() {
    const { userData, setUserData } = useUserData();
    const [ showDeleteOption, setDeleteOption ] = useState<boolean>(false);
    const router = useRouter();

    if (!userData.isLogged) return <></>;

    const onLogout = async () => {
        try {
            await authApi.logout();
            setUserData({ isLogged: false });
        } catch (error: any) {
            setUserData({ isLogged: false });
            console.error(error);
        }
        router.push("/");
    };

    // TODO: Melhorar estilizações como um todo... está bem quebrado
    // TODO: Criar lógica no backend pra apagar uma conta e atualizar aqui...
    // TODO: Não só aqui, mas em outros lugares adicionar fade para transição de tela...
    // TODO: Adicionar mensagem de error pro caso do cara não marcar o checkbox
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const checkboxValue = (document?.getElementById("delete") as any)?.checked;
    };

    return (
        <Parts.Form onSubmit={handleSubmit}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "12px 0px",
                    alignItems: "flex-start",
                    justifyContent: "center"
                }}
            >
                {!showDeleteOption && <Parts.Button onClick={onLogout}>{"Sair"}</Parts.Button>}
                {!showDeleteOption && <Parts.Button onClick={() => setDeleteOption(true)} style={{ backgroundColor: "#2E3B4F", color: "#FFFFFF" }}>
                    {"Apagar conta"}
                </Parts.Button>}
                {showDeleteOption && <h3 style={{ margin: "0px", alignSelf: "baseline" }}>{"Você quer mesmo apagar sua conta? Esse processo será irreversível"}</h3>}
                {showDeleteOption && <Parts.Checkbox id={"delete"} label={"Quero apagar minha conta e todos os meus dados."} />}
                <Parts.SubmitButton
                    style={{
                        backgroundColor: "#F44336",
                        color: "#FFFFFF",
                        marginTop: "0px",
                        marginBottom: "0px"
                    }}
                    isActive={showDeleteOption}
                >
                    {"Apagar"}
                </Parts.SubmitButton>
                {showDeleteOption && <Parts.Button onClick={() => setDeleteOption(false)}>{"Cancelar"}</Parts.Button>}
            </div>
        </Parts.Form>
    );
}
