import React, { useEffect } from "react";
import * as Styles from "./style";
import { Box } from "../box";
import { Pagination, Divider } from "@mui/material";
import { Delete, Edit, AddCircle, Info } from "@mui/icons-material";
import { fetchRecords } from "../../api/baby-record";
import { IFetchRecordResponse } from "../../api/baby-record/types";

// TODO: Adicionar skeleton e outros ajustes finos de design...
// TODO: Criar variação pro componente sem o "end"... os ícones viram
//       todos um único ícone de check..
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
                    {records?.map((r, i) => {
                        const init = r.init.toLocaleTimeString().slice(0, 5);
                        const end = r.end?.toLocaleTimeString().slice(0, 5) || "--:--";
                        const date = r.init.toLocaleDateString();
                        return (
                            <Styles.RecordWrapper key={i}>
                                <Styles.RecordName>{r.action}</Styles.RecordName>
                                <Styles.RecordDateWrapper>
                                    <Styles.RecordDate>{`${init} a ${end}`}</Styles.RecordDate>
                                    <Styles.RecordDate>{date}</Styles.RecordDate>
                                </Styles.RecordDateWrapper>
                                {/* Esse info pode abrir um tooltip com as observações do evento... */}
                                <Styles.IconsWrapper>
                                    <Info />
                                    <Edit />
                                    <Delete />
                                </Styles.IconsWrapper>
                            </Styles.RecordWrapper>
                        );
                    })}
                </Styles.RecordsWrapper>
                <Pagination count={count} page={page} onChange={(_, p) => setPage(p)} />
            </Styles.Container>
        </Box>
        // <Styles.Root>
        // </Styles.Root>
    );
}
