import React, { useEffect } from "react";
import * as Parts from "../parts";

export interface WeightProps {}

export function WeightForm({}: WeightProps) {
    const [init, setInit] = React.useState<Date>(new Date());
    const [end, setEnd] = React.useState<Date>(new Date());
    const [disabled, setDisabled] = React.useState(true);
    const [slider, setSlider] = React.useState(0);

    useEffect(() => {
        setDisabled(false);
    }, [init, slider, end]);

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
            <Parts.Slider
                value={slider}
                onChange={(v) => setSlider(v)}
                label={`Peso: ${slider}kg`}
                marks={[
                    { value: 0, label: "0kg" },
                    { value: 20, label: "20kg" },
                ]}
                max={20}
                defaultValue={0}
                step={1}
            />
            <Parts.DispatchButton
                disabled={disabled}
                onUpdate={onUpdate}
                label={"Atualizar"}
            />
        </Parts.Group>
    );
}