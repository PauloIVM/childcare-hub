import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";
import { IFetchRecordResponse } from "../../../api/baby-record/types";

// TODO: Refatorar para gerenciamento de estados com reducer...
// TODO: Se tentar acessar algumas paginas sem ter feito o login, crasha
// TODO: Parece estar rolando um bug onde o estado de dois records adicionados
//       em seguida se misturam.
// TODO: Adicionar snackbar e mostrar errors/success que venham da api...
// TODO: Mudar o record-confirm pra ter três botões e ficar com mesmo tamanho...
// TODO: Usar Button com endIcon no lugar de boxes em "Adicionar um novo evento"

interface RecordProps {
    record: IFetchRecordResponse["records"][0];
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Record(props: RecordProps) {
    const { record, forceUpdate, setforceUpdate } = props;
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
                    // INFO: Se ao invés deu passar o hook eu criar uma cb, melhora
                    //       a qualidade do código?
                    setMode={setMode}
                    forceUpdate={forceUpdate}
                    setforceUpdate={setforceUpdate}
                />
            </Fade>
            <Fade show={mode === "default"} keepMounted>
                <RecordDefault
                    record={record}
                    setMode={setMode}
                    forceUpdate={forceUpdate}
                    setforceUpdate={setforceUpdate}
                />
            </Fade>
        </>
    );
}
