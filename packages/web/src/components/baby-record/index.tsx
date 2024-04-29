import React, { useEffect } from "react";
import { Alert, Snackbar, Backdrop, CircularProgress } from "@mui/material";
import { Accordion } from "../accordion";
import { Box } from "../box";
import { Pagination, Divider, Button } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { IFetchRecordResponse } from "@/gateways/baby-record/types";
import { Record } from "./parts/record";
import { IUpdateRecordInput } from "@/gateways/baby-record/types";
import { useUserData } from "@/context";
import { useRouter } from "next/router";
import * as Api from "@/gateways/baby-record";
import * as Styles from "./style";

export function BabyRecord() {
    const router = useRouter();
    const { userData } = useUserData();
    const limit = 5;
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [backdropOpen, setBackdropOpen] = React.useState(false);
    const [page, setPage] = React.useState<number>(1);
    const [count, setCount] = React.useState<number>();
    const [records, setRecords] = React.useState<IFetchRecordResponse["records"]>();
    const [validActions, setValidActions] = React.useState<IFetchRecordResponse["validActions"]>();

    async function fetchRecords() {
        try {
            const result = await Api.fetchRecords({ skip: (page - 1) * limit, limit });
            setRecords(result.records);
            setValidActions(result.validActions);
            setCount(Math.ceil(result.count / limit));
        } catch (error: any) {
            setErrorMessage(error?.message);  
        }
    }

    async function onInsertClick(actionName: string) {
        try {
            setBackdropOpen(true);
            await Api.insertRecord({ actionName, observations: "", init: new Date() });
            page > 1 ? setPage(1) : await fetchRecords();
            setTimeout(() => {
                setSuccessMessage("Iniciando contagem do evento.");
                setBackdropOpen(false);
            }, 300);
        } catch (error: any) {
            setTimeout(() => {
                setErrorMessage("Falha ao iniciar contagem. Tente novamente.");  
                setBackdropOpen(false);
            }, 300); 
        }
    }

    async function onClickConfirm(recordId: string) {
        try {
            setBackdropOpen(true);
            await Api.updateRecord({ recordId, fields: { end: new Date() }});
            await fetchRecords();
            setTimeout(() => {
                setSuccessMessage("Evento cadastrado com sucesso.");
                setBackdropOpen(false);
            }, 300);
        } catch (error: any) {
            setTimeout(() => {
                setErrorMessage("Falha ao cadastrar evento. Tente novamente.");  
                setBackdropOpen(false);
            }, 300); 
        }
    }

    async function onClickUpdate({ recordId, fields }: IUpdateRecordInput) {
        try {
            setBackdropOpen(true);
            await Api.updateRecord({ recordId, fields });
            await fetchRecords();
            // INFO: Esse timeout é só pq eu quero que o backdrop apareça ao menos por um instante,
            //       acho q o UX fica melhor. Mas em prod provavelmente não responderá tão rápido,
            //       daí posso só remover isso.
            setTimeout(() => {
                setSuccessMessage("Evento atualizado com sucesso.");
                setBackdropOpen(false);
            }, 300);
        } catch (error: any) {
            setTimeout(() => {
                setErrorMessage(error?.message);  
                setBackdropOpen(false);
            }, 300);
        }
    }

    async function onClickDelete(recordId: string) {
        try {
            setBackdropOpen(true);
            await Api.deleteRecord({ recordId });
            records?.length === 1 && page > 1 ? setPage(page - 1) : await fetchRecords();
            setTimeout(() => {
                setSuccessMessage("Evento excuído com sucesso.");
                setBackdropOpen(false);
            }, 300);
        } catch (error: any) {
            setTimeout(() => {
                setErrorMessage("Falha ao excluir evento. Tente novamente.");  
                setBackdropOpen(false);
            }, 300); 
        }
    }

    async function onChangePagination(page: number) {
        setPage(page);
    }

    useEffect(() => {
        if (!userData.isLogged) { return; }
        setBackdropOpen(true);
        fetchRecords()
            .then(() => { setTimeout(() => setBackdropOpen(false), 300); })
            .catch(() => setTimeout(() => setBackdropOpen(false), 300));
    }, [page, userData.isLogged]);

    useEffect(() => {
        if (!userData.isLoading && !userData.isLogged) {
            router.push("/sign-in");
        }
    }, [userData.isLogged, userData.isLoading]);

    if (userData.isLoading) return <></>;

    return (
        <Box>
            {/*
                TODO: Jogar o snackbar para outro componente e deixar aqui apenas os
                    estados. Aliás, fazer isso com um cado desses componentes pra limpar
                    um pouco. O snackbar pode receber um atributo chamado apenas "message".
            */}
            <Backdrop open={backdropOpen} sx={{ color: "#fff", zIndex: 10000 }}>
                <CircularProgress color={"warning"} />
            </Backdrop>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => { setSuccessMessage(""); }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSuccessMessage("")}
                    severity={"success"}
                    variant={"filled"}
                    sx={{ width: "100%" }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={6000}
                onClose={() => { setErrorMessage(""); }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setErrorMessage("")}
                    severity={"error"}
                    variant={"filled"}
                    sx={{ width: "100%" }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Styles.Container>
                <Styles.AddRecordWrapper>
                    <Accordion
                        icon={<AddCircle />}
                        summary={
                            <Styles.RecordItem>{"Adicionar um novo evento"}</Styles.RecordItem>
                        }
                        trigger={"summary"}
                        details={
                            <Styles.InsertWrapper>
                                <Styles.InsertText>{"Escolha o evento que deseja adicionar:"}</Styles.InsertText>
                                <Styles.InsertBoxesWrapper>
                                    {validActions?.map((a, i) => {
                                        return (
                                            <Button
                                                variant={"outlined"}
                                                endIcon={<AddCircle />}
                                                color={"warning"}
                                                key={i}
                                                onClick={() => onInsertClick(a.name)}
                                            >
                                                {a.label}
                                            </Button >
                                        );
                                    })}
                                </Styles.InsertBoxesWrapper>
                            </Styles.InsertWrapper>
                        }
                    />
                </Styles.AddRecordWrapper>
                <Divider />
                <Styles.RecordsWrapper>
                    {records?.map((r, i) => (
                        <Record
                            key={`${page}${i}`}
                            onClickConfirm={onClickConfirm}
                            onClickDelete={onClickDelete}
                            onClickUpdate={onClickUpdate}
                            record={r}
                        />
                    ))}
                </Styles.RecordsWrapper>
                <Pagination count={count} page={page} onChange={(_, p) => onChangePagination(p)} />
            </Styles.Container>
        </Box>
    );
}
