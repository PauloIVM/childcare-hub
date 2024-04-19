import React, { useEffect } from "react";
import * as Styles from "./style";
import { Box } from "../box";
import { Pagination, Divider } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { fetchRecords } from "../../api/baby-record";
import { IFetchRecordResponse } from "../../api/baby-record/types";
import { Record } from "./parts/record";

export function BabyRecord() {
    const limit = 5;
    const [page, setPage] = React.useState<number>(1);
    const [count, setCount] = React.useState<number>();
    const [records, setRecords] = React.useState<IFetchRecordResponse["records"]>();

    useEffect(() => {
        fetchRecords({ skip: (page - 1) * limit, limit })
            .then((result) => {
                setRecords(result.records);
                setCount(Math.ceil(result.count / limit));
            })
            .catch(); // TODO: Handle that...
        return;
    }, [page]);

    return (
        <Box>
            <Styles.Container>
                <Styles.AddRecordWrapper>
                    <Styles.RecordItem>{"Adicionar evento..."}</Styles.RecordItem>
                    <Styles.RecordItem>
                        <AddCircle />
                    </Styles.RecordItem>
                </Styles.AddRecordWrapper>
                <Divider />
                <Styles.RecordsWrapper>
                    {records?.map((r, i) => <Record key={i} {...r} />)}
                </Styles.RecordsWrapper>
                <Pagination count={count} page={page} onChange={(_, p) => setPage(p)} />
            </Styles.Container>
        </Box>
        // <Styles.Root>
        // </Styles.Root>
    );
}
