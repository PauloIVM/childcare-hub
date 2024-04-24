import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";
import { IFetchRecordResponse, IUpdateRecordInput } from "../../../api/baby-record/types";

// TODO: Refatorar para gerenciamento de estados com reducer...
// TODO: Se tentar acessar algumas paginas sem ter feito o login, crasha
// TODO: Adicionar snackbar e mostrar errors/success que venham da api...
// TODO: Mudar o record-confirm pra ter três botões e ficar com mesmo tamanho...
// TODO: Usar Button com endIcon no lugar de boxes em "Adicionar um novo evento"

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
