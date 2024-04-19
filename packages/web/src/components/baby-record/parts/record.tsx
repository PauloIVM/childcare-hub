import React from "react";
import * as Styles from "../style";
import { Tooltip } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";

// TODO: Adicionar skeleton e outros ajustes finos de design...
// TODO: Criar variação pro componente sem o "end"... os ícones viram
//       todos um único ícone de check..

interface RecordProps {
    action: string;
    init: Date;
    observations: string;
    end?: Date;
}

export function Record({ action, init, end, observations }: RecordProps) {
    const initParsed = init.toLocaleTimeString().slice(0, 5);
    const endParsed = end?.toLocaleTimeString().slice(0, 5) || "--:--";
    const date = init.toLocaleDateString();
    return (
        <Styles.RecordWrapper>
            <Styles.RecordName><p>{action}</p></Styles.RecordName>
            <Styles.RecordDateWrapper>
                <Styles.RecordDate>{`${initParsed} a ${endParsed}`}</Styles.RecordDate>
                <Styles.RecordDate>{date}</Styles.RecordDate>
            </Styles.RecordDateWrapper>
            {/* Esse info pode abrir um tooltip com as observações do evento... */}
            <Styles.IconsWrapper>
                <Tooltip
                    placement={"top-end"}
                    title={observations}
                    leaveTouchDelay={10000}
                    enterTouchDelay={100}
                >
                    <Info />
                </Tooltip>
                <Edit color={"success"} />
                <Delete color={"error"} />
            </Styles.IconsWrapper>
        </Styles.RecordWrapper>
    );
}
