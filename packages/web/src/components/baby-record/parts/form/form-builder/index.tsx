import React, { useEffect } from "react";
import {
    IFetchRecordResponse,
    IUpdateRecordInput
} from "@/gateways/baby-record/types";
import { DateInput } from "./date-input";
import { DispatchButton } from "./dispatch-button";
import { Group } from "./group";
import { SingleSelect } from "./single-select";
import { Slider } from "./slider";
import { TextInput } from "./text-input";
import { Switch } from "./switch";

export interface FormBuilderProps {
    record: IFetchRecordResponse["records"][0];
    withWeight?: boolean;
    withHeight?: boolean;
    onClickUpdate: (input: IUpdateRecordInput) => Promise<void>;
    withTemperature?: boolean;
    withSleepQuality?: boolean;
    withObservations?: boolean;
    withBreastfeedingType?: boolean;
    withBreastfeedingAmount?: boolean;
}

export function FormBuilder(props: FormBuilderProps) {
    const {
        record,
        withWeight,
        withHeight,
        onClickUpdate,
        withTemperature,
        withObservations,
        withSleepQuality,
        withBreastfeedingType,
        withBreastfeedingAmount,
    } = props;

    const [end, setEnd] = React.useState<Date | undefined>(record.end);
    const [init, setInit] = React.useState<Date>(record.init);
    const [weight, setWeight] = React.useState(record.weight || 0);
    const [height, setHeight] = React.useState(record.height || 0);
    const [disabled, setDisabled] = React.useState(true);
    const [temperature, setTemperature] = React.useState(record.temperature || 32);
    const [sleepQuality, setSleepQuality] = React.useState(record.sleepQuality || "");
    const [observations, setObservations] = React.useState(record.observations || "");
    const [breastfeedingType, setBreastfeedingType] = React.useState(record.breastfeedingType || "");
    const [breastfeedingAmount, setBreastfeedingAmount] = React.useState(record.breastfeedingAmount || 0);

    useEffect(() => {
        setDisabled(false);
    }, [
        end,
        init,
        weight,
        height,
        temperature,
        observations,
        sleepQuality,
        breastfeedingType,
        breastfeedingAmount,
    ]);

    useEffect(() => {
        setEnd(record.end);
        setInit(record.init);
        setWeight(record.weight || 0);
        setHeight(record.height || 0);
        setTemperature(record.temperature || 32);
        setObservations(record.observations || "");
        setSleepQuality(record.sleepQuality || "");
        setBreastfeedingType(record.breastfeedingType || "");
        setBreastfeedingAmount(record.breastfeedingAmount || 0);
        setDisabled(true);
    }, [record.id]);

    return (
        <Group>
            <DateInput
                value={init}
                onChange={(date) => setInit(date)}
                label={"Início"}
            />
            <DateInput
                value={end}
                onChange={(date) => setEnd(date)}
                label={"Fim"}
            />
            <SingleSelect
                active={!!withBreastfeedingType}
                value={breastfeedingType}
                onChange={(v) => setBreastfeedingType(v)}
                label={"Tipo de mamada"}
                menu={[
                    { label: "Seio esquerdo", value: "left" },
                    { label: "Seio direito", value: "right" },
                    { label: "Ambos os seios", value: "both" },
                    { label: "Mamadeira", value: "bottle" },
                ]}
            />
            <SingleSelect
                active={!!withSleepQuality}
                value={sleepQuality}
                onChange={(v) => setSleepQuality(v)}
                label={"Qualidade do sono"}
                menu={[
                    { label: "Muito ruim", value: "very_bad" },
                    { label: "Ruim", value: "bad" },
                    { label: "Normal", value: "ok" },
                    { label: "Bom", value: "good" },
                    { label: "Muito bom", value: "very_good" },
                ]}
            />
            <TextInput
                active={!!withObservations}
                value={observations}
                onChange={(v) => setObservations(v)}
                label={"Observações"}
            />
            <Slider
                active={!!withHeight}
                value={height}
                onChange={(v) => setHeight(v)}
                label={`Altura: ${height}cm`}
                marks={[
                    { value: 0, label: "0cm" },
                    { value: 100, label: "100cm" },
                ]}
                max={100}
                defaultValue={0}
                step={5}
            />
            <Slider
                active={!!withBreastfeedingAmount}
                value={breastfeedingAmount}
                onChange={(v) => setBreastfeedingAmount(v)}
                label={`Quantidade: ${breastfeedingAmount}ml`}
                marks={[
                    { value: 0, label: "0ml" },
                    { value: 400, label: "400ml" },
                ]}
            />
            <Slider
                active={!!withTemperature}
                value={temperature}
                onChange={(v) => setTemperature(v)}
                label={`Temperatura: ${temperature}°C`}
                marks={[
                    { value: 32, label: "32°C" },
                    { value: 43, label: "43°C" },
                ]}
                min={32}
                max={43}
                defaultValue={32}
                step={0.5}
            />
            <Slider
                active={!!withWeight}
                value={weight}
                onChange={(v) => setWeight(v)}
                label={`Peso: ${weight}kg`}
                marks={[
                    { value: 0, label: "0kg" },
                    { value: 20, label: "20kg" },
                ]}
                max={20}
                defaultValue={0}
                step={1}
            />
            <DispatchButton
                disabled={disabled}
                onUpdate={async () => {
                    await onClickUpdate({ recordId: record.id, fields: {
                        end,
                        init,
                        weight,
                        height,
                        temperature,
                        sleepQuality,
                        observations,
                        breastfeedingType,
                        breastfeedingAmount,
                    }});
                    setDisabled(true);
                }}
                label={"Atualizar"}
            />
        </Group>
    );
}
