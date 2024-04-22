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
    const [validActions, setValidActions] = React.useState<IFetchRecordResponse["validActions"]>();
    const [forceUpdate, setforceUpdate] = React.useState<boolean>(false);

    useEffect(() => {
        fetchRecords({ skip: (page - 1) * limit, limit })
            .then((result) => {
                setRecords(result.records);
                setValidActions(result.validActions);
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
                                    {validActions?.map((a) => {
                                        return (
                                            <Styles.InsertBox
                                                onClick={() => onInsertClick(a.name, "TODO: Desenvolver uma observation personalizada para cada tipo de action")}
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
