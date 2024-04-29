import React from "react";
import { DefaultForm } from "./assemblies/default";
import { BreastFeedForm } from "./assemblies/breastfeed-form";
import { SleepForm } from "./assemblies/sleep-form";
import { TemperatureForm } from "./assemblies/temperature";
import { HeightForm } from "./assemblies/height";
import { WeightForm } from "./assemblies/weight";
import { IFetchRecordResponse, IUpdateRecordInput } from "@/gateways/baby-record/types";

export interface FormProps {
    record: IFetchRecordResponse["records"][0];
    onClickUpdate: (input: IUpdateRecordInput) => Promise<void>
    assembly:
        | "sleep"
        | "breastfeed"
        | "change_diapers"
        | "urination"
        | "poop"
        | "bath"
        | "cry"
        | "vaccine"
        | "doctor"
        | "walk"
        | "temperature"
        | "height"
        | "weight"
        | "other";
}

export function Form({ assembly, ...otherProps }: FormProps) {
    if (assembly === "breastfeed") {
        return (<BreastFeedForm {...otherProps} />);
    }
    if (assembly === "sleep") {
        return (<SleepForm {...otherProps} />);
    }
    if (assembly === "temperature") {
        return (<TemperatureForm {...otherProps} />);
    }
    if (assembly === "height") {
        return (<HeightForm {...otherProps} />);
    }
    if (assembly === "weight") {
        return (<WeightForm {...otherProps} />);
    }
    return (<DefaultForm {...otherProps} />);
}
