import React, { useEffect } from "react";
import * as Parts from "../parts";

export interface OtherProps {}

export function OtherForm({}: OtherProps) {
    const [init, setInit] = React.useState<Date>(new Date());
    const [end, setEnd] = React.useState<Date>(new Date());
    const [observations, setObservations] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    useEffect(() => {
        setDisabled(false);
    }, [init, observations, end]);

    function onUpdate() {
        setDisabled(true);
        // TODO: Disparar request de update...
        // TODO: Adicionar snackbar e mostrar errors que venham da api...
    }

    return (
        <Parts.Group>
            <Parts.DateInput
                value={init}
                onChange={(date) => setInit(date)}
                label={"Início"}
            />
            <Parts.DateInput
                value={end}
                onChange={(date) => setEnd(date)}
                label={"Fim"}
            />
            <Parts.TextInput
                value={observations}
                onChange={(v) => setObservations(v)}
                label={"Observações"}
            />
            <Parts.DispatchButton
                disabled={disabled}
                onUpdate={onUpdate}
                label={"Atualizar"}
            />
        </Parts.Group>
    );
}