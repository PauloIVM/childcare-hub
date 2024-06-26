import React from "react";
import { Accordion } from "../../accordion";
import { Tooltip, IconButton } from "@mui/material";
import { Delete, Edit, Info } from "@mui/icons-material";
import { Form, FormProps } from "./form";
import { IFetchRecordResponse, IUpdateRecordInput } from "@/gateways/baby-record/types";
import * as Styles from "../style";

interface RecordDefaultProps {
    record: IFetchRecordResponse["records"][0];
    onClickDelete: () => void;
    onClickUpdate: (input: IUpdateRecordInput) => Promise<void>;
}

export function RecordDefault(props: RecordDefaultProps) {
    const { record, onClickDelete, onClickUpdate } = props;
    const {
        actionLabel,
        actionName,
        init,
        end,
        observations,
    } = record;
    const initParsed = init.toLocaleTimeString().slice(0, 5);
    const endParsed = end?.toLocaleTimeString().slice(0, 5) || "--:--";
    const date = init.toLocaleDateString();

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
                details={
                    <Form
                        record={record}
                        onClickUpdate={onClickUpdate}
                        assembly={actionName as FormProps["assembly"]}
                    />
                }
            />
        </Styles.RecordRoot>
    );
}
