import React, { useEffect } from "react";
import * as Parts from "../parts";

export interface TemperatureProps {}

export function TemperatureForm({}: TemperatureProps) {
    const [init, setInit] = React.useState<Date>(new Date());
    const [end, setEnd] = React.useState<Date>(new Date());
    const [disabled, setDisabled] = React.useState(true);
    const [slider, setSlider] = React.useState(32);

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
                label={`Temperatura: ${slider}°C`}
                marks={[
                    { value: 32, label: "32°C" },
                    { value: 43, label: "43°C" },
                ]}
                min={32}
                max={43}
                defaultValue={32}
                step={0.5}
            />
            <Parts.DispatchButton
                disabled={disabled}
                onUpdate={onUpdate}
                label={"Atualizar"}
            />
        </Parts.Group>
    );
}