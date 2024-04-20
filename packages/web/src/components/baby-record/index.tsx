import React, { useEffect } from "react";
import { Accordion } from "../accordion";
import { Box } from "../box";
import { Pagination, Divider } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { fetchRecords, insertRecord } from "../../api/baby-record";
import { IFetchRecordResponse } from "../../api/baby-record/types";
import { Record } from "./parts/record";
import * as Styles from "./style";

export function BabyRecord() {
    const limit = 5;
    const [page, setPage] = React.useState<number>(1);
    const [count, setCount] = React.useState<number>();
    const [records, setRecords] = React.useState<IFetchRecordResponse["records"]>();
    const [forceUpdate, setforceUpdate] = React.useState<boolean>(false);

    useEffect(() => {
        fetchRecords({ skip: (page - 1) * limit, limit })
            .then((result) => {
                setRecords(result.records);
                setCount(Math.ceil(result.count / limit));
            })
            .catch(); // TODO: Handle that...
        return;
    }, [page, forceUpdate]);

    function onInsertClick(action: string, observations: string) {
        insertRecord({ action, observations, init: new Date() })
            .then(() => {
                setforceUpdate(!forceUpdate);
                setPage(1);
            });
        // TODO: Adicionar algum tipo de loading...
    }

    return (
        <Box>
            <Styles.Container>
                <Styles.AddRecordWrapper>
                    <Accordion
                        icon={<AddCircle />}
                        summary={
                            <Styles.RecordItem>{"Adicionar um novo evento"}</Styles.RecordItem>
                        }
                        details={
                            <Styles.InsertWrapper>
                                <Styles.InsertText>{"Escolha o evento que deseja adicionar:"}</Styles.InsertText>
                                <Styles.InsertBoxesWrapper>
                                    <Styles.InsertBox onClick={() => onInsertClick("Dormir", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Dormir"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Mamar", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Mamar"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Trocar fralda", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Trocar fralda"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Micção", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Micção"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Cocô", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Cocô"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Banho", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Banho"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Choro", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Choro"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Vacina", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Vacina"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Médico", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Médico"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Passear", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Passear"}
                                    </Styles.InsertBox>
                                    <Styles.InsertBox onClick={() => onInsertClick("Outro", "TODO: Desenvolver uma observation personalizada para cada tipo de action")}>
                                        {"Outro"}
                                    </Styles.InsertBox>
                                </Styles.InsertBoxesWrapper>
                            </Styles.InsertWrapper>
                        }
                    />
                </Styles.AddRecordWrapper>
                <Divider />
                <Styles.RecordsWrapper>
                    {records?.map((r, i) => (
                        <Record
                            forceUpdate={forceUpdate}
                            setforceUpdate={setforceUpdate}
                            key={`${page}${i}`}
                            {...r}
                        />
                    ))}
                </Styles.RecordsWrapper>
                <Pagination count={count} page={page} onChange={(_, p) => setPage(p)} />
            </Styles.Container>
        </Box>
    );
}
