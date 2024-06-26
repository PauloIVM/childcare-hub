import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";
import { IFetchRecordResponse, IUpdateRecordInput } from "@/gateways/baby-record/types";

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
    const { id, end } = record;
    const initialMode = end ? "default" : "confirm";

    // TODO: Eu estava usando esse 'mode' pra ao deletar ou adicionar elemetos, fazer isso de forma
    //       suavizada. Mas por alguma razão, ficou bugado no RecordConfirm quando eu deletava algo,
    //       corrigir ou pensar em outra forma de diminuir o height.
    // const [mode, setMode] = React.useState<"default" | "confirm" | "hide">(initialMode);

    // useEffect(() => {
    //     setMode(end ? "default" : "confirm");
    // }, [end]);

    return (
        <>
            <Fade show={initialMode === "confirm"} keepMounted>
                <RecordConfirm
                    record={record}
                    onClickConfirm={async () => {
                        // setMode("default");
                        onClickConfirm(id);
                    }}
                    onClickDelete={async () => {
                        // setMode("hide");
                        onClickDelete(id);
                    }}
                />
            </Fade>
            <Fade show={initialMode === "default"} keepMounted>
                <RecordDefault
                    record={record}
                    onClickUpdate={onClickUpdate}
                    onClickDelete={async () => {
                        // setMode("hide");
                        onClickDelete(id);
                    }}
                />
            </Fade>
        </>
    );
}
