import React from "react";
import { Accordion } from "../../accordion";
import { Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { deleteRecord } from "../../../api/baby-record";
import { Form, FormProps } from "./form";
import { IFetchRecordResponse } from "../../../api/baby-record/types";
import * as Styles from "../style";

interface RecordDefaultProps {
    record: IFetchRecordResponse["records"][0];
    setMode: React.Dispatch<React.SetStateAction<"default" | "confirm" | "hide">>;
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RecordDefault(props: RecordDefaultProps) {
    const {
        record,
        setMode,
        forceUpdate,
        setforceUpdate
    } = props;
    const {
        id,
        actionLabel,
        actionName,
        init,
        end,
        observations,
    } = record;
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
        // INFO: Usar o snackbar do MUI, usar em outros lugares tbm... como quando faz
        //       um insert, update ou etc... https://mui.com/material-ui/react-snackbar/#use-with-alerts
    }

    return (
        <Styles.RecordRoot>
            <Accordion
                icon={<Edit color={"success"} />}
                summary={
                    <Styles.RecordWrapper>
                        <Styles.RecordName><p>{actionLabel}</p></Styles.RecordName>
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
                details={<Form record={record} assembly={actionName as FormProps["assembly"]} />}
            />
        </Styles.RecordRoot>
    );
}
