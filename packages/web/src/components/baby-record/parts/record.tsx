import React, { useEffect } from "react";
import { Accordion } from "../../accordion";
import { Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { deleteRecord } from "../../../api/baby-record";
import * as Styles from "../style";

// TODO: Adicionar skeleton e outros ajustes finos de design...
// TODO: Criar variação pro componente sem o "end"... os ícones viram
//       todos um único ícone de check..
// TODO: Preciso incrementar o número de deletados em um estado e considerar
//       isso no componente pai desse. Se eu apagar todos os elementos da
//       penúltima página, e então ir para a última, eu serei jogado em uma
//       página sem nenhum elemento.
// TODO: Os botões de 'delete', 'info' e 'update' estão com um clique muito próximo
//       no mobile... gera alguns miss-clicks... entender como melhorar...
// TODO: Quando n tem nenhum record, ao abrir a pagina da ferramente, o codigo crasha...
//       semelhantemente, se tentar acessar algumas paginas sem ter feito o login, crasha... tratar isso

interface RecordProps {
    id: string;
    action: string;
    init: Date;
    observations: string;
    end?: Date;
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Record({ id, action, init, end, observations, forceUpdate, setforceUpdate }: RecordProps) {
    const initialMode = end ? "default" : "confirm";
    const [mode, setMode] = React.useState<"default" | "confirm" | "hide">(initialMode);
    const initParsed = init.toLocaleTimeString().slice(0, 5);
    const endParsed = end?.toLocaleTimeString().slice(0, 5) || "--:--";
    const date = init.toLocaleDateString();

    useEffect(() => {
        setMode(end ? "default" : "confirm");
    }, [end]);

    function onClickDelete() {
        setMode("hide");
        deleteRecord({ recordId: id });
        // TODO: Caso falhe em deletar, mostrar isso em um popup ou similar...
    }

    return (
        <>
            <Fade show={mode === "confirm"} keepMounted>
                <RecordConfirm
                    id={id}
                    action={action}
                    init={init}
                    setMode={setMode}
                    forceUpdate={forceUpdate}
                    setforceUpdate={setforceUpdate}
                />
            </Fade>
            <Fade show={mode === "default"} keepMounted>
                <Styles.RecordRoot>
                <Accordion
                    icon={<IconButton><Edit color={"success"} /></IconButton>}
                    summary={
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
                                <IconButton onClick={onClickDelete}>
                                    <Delete color={"error"} />
                                </IconButton>
                            </Styles.IconsWrapper>
                        </Styles.RecordWrapper>
                    }
                    details={"teste"}
                />
                </Styles.RecordRoot>
            </Fade>
        </>
    );
}
