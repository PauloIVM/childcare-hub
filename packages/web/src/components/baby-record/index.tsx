import React, { useEffect } from "react";
import * as Styles from "./style";
import { Box } from "../box";
import { Pagination, Divider } from "@mui/material";
import { Delete, Edit, AddCircle, Info } from "@mui/icons-material";

export function BabyRecord() {
    // INFO: Vou precisar q a api de get-records me retorne a contagem do total...
    const [page, setPage] = React.useState(0);

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
                    <Styles.RecordWrapper>
                        <Styles.RecordName>{"Evento 1..."}</Styles.RecordName>
                        <Styles.RecordItem>{"16:20"}</Styles.RecordItem>
                        <Styles.RecordItem>{"20/04/2024"}</Styles.RecordItem>
                        {/* Esse info pode abrir um tooltip com as observações do evento... */}
                        <Info />
                        <Edit />
                        <Delete />
                    </Styles.RecordWrapper>
                    <Styles.RecordWrapper>
                        <Styles.RecordName>{"Evento 1..."}</Styles.RecordName>
                        <Styles.RecordItem>{"16:20"}</Styles.RecordItem>
                        <Styles.RecordItem>{"20/04/2024"}</Styles.RecordItem>
                        {/* Esse info pode abrir um tooltip com as observações do evento... */}
                        <Info />
                        <Edit />
                        <Delete />
                    </Styles.RecordWrapper>
                    <Styles.RecordWrapper>
                        <Styles.RecordName>{"Evento 1..."}</Styles.RecordName>
                        <Styles.RecordItem>{"16:20"}</Styles.RecordItem>
                        <Styles.RecordItem>{"20/04/2024"}</Styles.RecordItem>
                        {/* Esse info pode abrir um tooltip com as observações do evento... */}
                        <Info />
                        <Edit />
                        <Delete />
                    </Styles.RecordWrapper>
                </Styles.RecordsWrapper>
                <Pagination count={10} page={10} />
            </Styles.Container>
        </Box>
        // <Styles.Root>
        // </Styles.Root>
    );
}
