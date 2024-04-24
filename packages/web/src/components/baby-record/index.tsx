import React, { useEffect } from "react";
import { Accordion } from "../accordion";
import { Box } from "../box";
import { Pagination, Divider } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { IFetchRecordResponse } from "../../api/baby-record/types";
import { Record } from "./parts/record";
import { IUpdateRecordInput } from "../../api/baby-record/types";
import { useUserData } from "@/context";
import { useRouter } from "next/router";
import * as Api from "../../api/baby-record";
import * as Styles from "./style";

export function BabyRecord() {
    const router = useRouter();
    const { userData } = useUserData();
    const limit = 5;
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
        } catch (error) {
            // TODO: Handle that with snackbar...   
        }
    }

    async function onInsertClick(actionName: string) {
        try {
            // TODO: Adicionar algum tipo de loading (backdrop no MUI)...
            await Api.insertRecord({ actionName, observations: "", init: new Date() });
            setPage(1);
            fetchRecords();
        } catch (error) {
            // TODO: Handle that with snackbar... 
        }
    }

    async function onClickConfirm(recordId: string) {
        try {
            await Api.updateRecord({ recordId, fields: { end: new Date() }});
            fetchRecords();
        } catch (error) {
            // TODO: Handle that with snackbar...
        }
    }

    async function onClickUpdate({ recordId, fields }: IUpdateRecordInput) {
        try {
            await Api.updateRecord({ recordId, fields });
            fetchRecords();
        } catch (error) {
            // TODO: Handle that with snackbar...
        }
    }

    async function onClickDelete(recordId: string) {
        try {
            await Api.deleteRecord({ recordId });
            fetchRecords();
        } catch (error) {
            // TODO: Handle that with snackbar...
        }
    }

    useEffect(() => {
        if (!userData.isLogged) { return; }
        fetchRecords();
    }, [page, userData.isLogged]);

    useEffect(() => {
        if (!userData.isLoading && !userData.isLogged) {
            router.push('/sign-in');
        }
    }, [userData.isLogged, userData.isLoading]);

    if (userData.isLoading) return <></>;

    return (
        <Box>
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
                                            <Styles.InsertBox
                                                key={i}
                                                onClick={() => onInsertClick(a.name)}
                                            >
                                                {a.label}
                                            </Styles.InsertBox>
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
                <Pagination count={count} page={page} onChange={(_, p) => setPage(p)} />
            </Styles.Container>
        </Box>
    );
}
