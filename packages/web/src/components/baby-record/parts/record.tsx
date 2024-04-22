import React, { useEffect } from "react";
import { Fade } from "../../fade";
import { RecordConfirm } from "./record-confirm";
import { RecordDefault } from "./record-default";

// TODO: Refatorar para gerenciamento de estados com reducer...
// TODO: Adicionar skeleton e outros ajustes finos de design...
// TODO: Preciso incrementar o número de deletados em um estado e considerar
//       isso no componente pai desse. Se eu apagar todos os elementos da
//       penúltima página, e então ir para a última, eu serei jogado em uma
//       página sem nenhum elemento.
// TODO: Quando n tem nenhum record, ao abrir a pagina da ferramente, o codigo crasha...
//       semelhantemente, se tentar acessar algumas paginas sem ter feito o login, crasha... tratar isso

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
                    action={actionLabel}
                    observations={observations}
                    init={init}
                    end={end}
                    setMode={setMode}
                />
            </Fade>
        </>
    );
}
