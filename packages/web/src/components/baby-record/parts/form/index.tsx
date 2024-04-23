import React from "react";
import { BathForm } from "./assemblies/bath";
import { BreastFeedForm } from "./assemblies/breastfeed-form";
import { ChangeDiapersForm } from "./assemblies/change_diapers";
import { CryForm } from "./assemblies/cry";
import { DoctorForm } from "./assemblies/doctor";
import { OtherForm } from "./assemblies/other";
import { PoopForm } from "./assemblies/poop";
import { SleepForm } from "./assemblies/sleep-form";
import { UrinationForm } from "./assemblies/urination";
import { VaccineForm } from "./assemblies/vaccine";
import { WalkForm } from "./assemblies/walk";
import { TemperatureForm } from "./assemblies/temperature";
import { HeightForm } from "./assemblies/height";
import { WeightForm } from "./assemblies/weight";

export interface FormProps {
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
    if (assembly === "bath") {
        return (<BathForm />);
    }
    if (assembly === "breastfeed") {
        return (<BreastFeedForm />);
    }
    if (assembly === "change_diapers") {
        return (<ChangeDiapersForm />);
    }
    if (assembly === "cry") {
        return (<CryForm />);
    }
    if (assembly === "doctor") {
        return (<DoctorForm />);
    }
    if (assembly === "other") {
        return (<OtherForm />);
    }
    if (assembly === "poop") {
        return (<PoopForm />);
    }
    if (assembly === "sleep") {
        return (<SleepForm />);
    }
    if (assembly === "urination") {
        return (<UrinationForm />);
    }
    if (assembly === "vaccine") {
        return (<VaccineForm />);
    }
    if (assembly === "walk") {
        return (<WalkForm />);
    }
    if (assembly === "temperature") {
        return (<TemperatureForm />);
    }
    if (assembly === "height") {
        return (<HeightForm />);
    }
    if (assembly === "weight") {
        return (<WeightForm />);
    }
}
