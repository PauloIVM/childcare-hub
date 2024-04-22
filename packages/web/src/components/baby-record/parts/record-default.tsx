import React from "react";
import { Accordion } from "../../accordion";
import { Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { deleteRecord } from "../../../api/baby-record";
import * as Styles from "../style";

interface RecordDefaultProps {
    id: string;
    action: string;
    init: Date;
    observations: string;
    end?: Date;
    setMode: React.Dispatch<React.SetStateAction<"default" | "confirm" | "hide">>;
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RecordDefault({ id, action, init, end, observations, setMode, forceUpdate, setforceUpdate }: RecordDefaultProps) {
    const initParsed = init.toLocaleTimeString().slice(0, 5);
    const endParsed = end?.toLocaleTimeString().slice(0, 5) || "--:--";
    const date = init.toLocaleDateString();

    function onClickDelete() {
        deleteRecord({ recordId: id })
            .then(() => {
                setMode("hide");
                setforceUpdate(!forceUpdate);
            })
            .catch();
        // TODO: Caso falhe em deletar, mostrar isso em um popup ou similar...
    }

    return (
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
    );
}
