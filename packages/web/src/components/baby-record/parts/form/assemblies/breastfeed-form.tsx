import React, { useEffect } from "react";
import * as Parts from "../parts";
import { IFetchRecordResponse } from "../../../../../api/baby-record/types";
import { updateRecord } from "../../../../../api/baby-record";

interface BreastFeedProps {
    record: IFetchRecordResponse["records"][0];
}

export function BreastFeedForm({ record }: BreastFeedProps) {
    // TODO: Passar os valores iniciais com base no record...
    // TODO: Adicionar snackbar e mostrar errors que venham da api...
    // TODO: Mudar o record-confirm pra ter três botões e ficar com mesmo tamanho...
    const [init, setInit] = React.useState<Date>(record.init);
    const [end, setEnd] = React.useState<Date | undefined>(record.end);
    const [textSelect, setTextSelect] = React.useState(record.breastfeedingType || "");
    const [observations, setObservations] = React.useState(record.observations || "");
    const [slider, setSlider] = React.useState(record.breastfeedingAmount || 0);
    const [disabled, setDisabled] = React.useState(true);

    useEffect(() => {
        setDisabled(false);
    }, [textSelect, observations, slider, init, end]);

    function onUpdate() {
        updateRecord({ recordId: record.id, fields: {
            init,
            end,
            breastfeedingType: textSelect,
            observations,
            breastfeedingAmount: slider
        }})
            .then(() => setDisabled(true))
            .catch((e) => console.log(e))
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