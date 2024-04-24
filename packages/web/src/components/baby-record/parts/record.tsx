import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";
import { IFetchRecordResponse, IUpdateRecordInput } from "../../../api/baby-record/types";

// TODO: Refatorar para gerenciamento de estados com reducer...
// TODO: Ao fazer o redirect para a página de login, bolar uma forma de mostrar lá
//       uma mensagem indicando pq o user foi redirecionado para lá... ou tratar isso
//       no próprio box que abre a página que exige login.

interface RecordProps {
    record: IFetchRecordResponse["records"][0];
    onClickConfirm: (recordId: string) => void;
    onClickDelete: (recordId: string) => void;
    onClickUpdate: (input: IUpdateRecordInput) => Promise<void>;
}

export function Record(props: RecordProps) {
    const { record, onClickConfirm, onClickDelete, onClickUpdate } = props;
    const { id, actionLabel, init, end } = record;
    const initialMode = end ? "default" : "confirm";
    const [mode, setMode] = React.useState<"default" | "confirm" | "hide">(initialMode);

    useEffect(() => {
        setMode(end ? "default" : "confirm");
    }, [end]);

    return (
        <>
            <Fade show={mode === "confirm"} keepMounted>
                <RecordConfirm
                    id={id}
                    action={actionLabel}
                    init={init}
                    onClickConfirm={async () => {
                        onClickConfirm(id);
                        setMode("default");
                    }}
                    onClickDelete={async () => {
                        onClickDelete(id);
                        setMode("hide");
                    }}
                />
            </Fade>
            <Fade show={mode === "default"} keepMounted>
                <RecordDefault
                    record={record}
                    onClickUpdate={onClickUpdate}
                    onClickDelete={async () => {
                        onClickDelete(id);
                        setMode("hide");
                    }}
                />
            </Fade>
        </>
    );
}
