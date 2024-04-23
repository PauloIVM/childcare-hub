import React, { useEffect } from "react";
import * as Parts from "../parts";

interface BreastFeedProps {}

export function BreastFeedForm({}: BreastFeedProps) {
    // TODO: Passar os valores iniciais com base no record...
    // TODO: Adicionar snackbar e mostrar errors que venham da api...
    // TODO: Mudar o record-confirm pra ter três botões e ficar com mesmo tamanho...
    const [init, setInit] = React.useState<Date>(new Date());
    const [end, setEnd] = React.useState<Date>(new Date());
    const [textSelect, setTextSelect] = React.useState("");
    const [observations, setObservations] = React.useState("");
    const [slider, setSlider] = React.useState(80);
    const [disabled, setDisabled] = React.useState(true);

    useEffect(() => {
        setDisabled(false);
    }, [textSelect, observations, slider, init, end]);

    function onUpdate() {
        setDisabled(true);
        // TODO: Disparar request de update...
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
            <Parts.SingleSelect
                value={textSelect}
                onChange={(v) => setTextSelect(v)}
                label={"Tipo de mamada"}
                menu={[
                    { label: "Seio esquerdo", value: "left" },
                    { label: "Seio direito", value: "right" },
                    { label: "Ambos os seios", value: "both" },
                    { label: "Mamadeira", value: "bottle" },
                ]}
            />
            <Parts.TextInput
                value={observations}
                onChange={(v) => setObservations(v)}
                label={"Observações"}
            />
            <Parts.Slider
                value={slider}
                onChange={(v) => setSlider(v)}
                label={`Quantidade: ${slider}ml`}
                marks={[
                    { value: 0, label: "0ml" },
                    { value: 400, label: "400ml" },
                ]}
            />
            <Parts.DispatchButton
                disabled={disabled}
                onUpdate={onUpdate}
                label={"Atualizar"}
            />
        </Parts.Group>
    );
}