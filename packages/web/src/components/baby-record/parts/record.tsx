import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";

// TODO: Refatorar para gerenciamento de estados com reducer...
// TODO: Se tentar acessar algumas paginas sem ter feito o login, crasha

interface RecordProps {
    id: string;
    actionName: string;
    actionLabel: string;
    init: Date;
    observations: string;
    end?: Date;
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Record(props: RecordProps) {
    const { id, actionName, actionLabel, init, end, observations, forceUpdate, setforceUpdate } = props;
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
                    setMode={setMode}
                    forceUpdate={forceUpdate}
                    setforceUpdate={setforceUpdate}
                />
            </Fade>
            <Fade show={mode === "default"} keepMounted>
                <RecordDefault
                    id={id}
                    actionName={actionName}
                    actionLabel={actionLabel}
                    observations={observations}
                    init={init}
                    end={end}
                    setMode={setMode}
                    forceUpdate={forceUpdate}
                    setforceUpdate={setforceUpdate}
                />
            </Fade>
        </>
    );
}
