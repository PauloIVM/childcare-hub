import React, { useEffect } from "react";
import * as Styles from "../style";
import { Tooltip } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { Fade } from "@mui/material";
import { deleteRecord } from "../../../api/baby-record";

// TODO: Adicionar skeleton e outros ajustes finos de design...
// TODO: Criar variação pro componente sem o "end"... os ícones viram
//       todos um único ícone de check..
// TODO: Preciso incrementar o número de deletados em um estado e considerar
//       isso no componente pai desse. Se eu apagar todos os elementos da
//       penúltima página, e então ir para a última, eu serei jogado em uma
//       página sem nenhum elemento.

interface RecordProps {
    id: string;
    action: string;
    init: Date;
    observations: string;
    end?: Date;
}

export function Record({ id, action, init, end, observations }: RecordProps) {
    const [show, setShow] = React.useState(true);
    const initParsed = init.toLocaleTimeString().slice(0, 5);
    const endParsed = end?.toLocaleTimeString().slice(0, 5) || "--:--";
    const date = init.toLocaleDateString();

    function onClickDelete() {
        setShow(false);
        deleteRecord({ recordId: id });
    }

    return (
        <Fade in={show} timeout={500}>
            <Styles.RecordWrapper>
                <Styles.RecordName><p>{action}</p></Styles.RecordName>
                <Styles.RecordDateWrapper>
                    <Styles.RecordDate>{`${initParsed} a ${endParsed}`}</Styles.RecordDate>
                    <Styles.RecordDate>{date}</Styles.RecordDate>
                </Styles.RecordDateWrapper>
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
                    <Delete color={"error"} onClick={onClickDelete} />
                </Styles.IconsWrapper>
            </Styles.RecordWrapper>
        </Fade>
    );
}
