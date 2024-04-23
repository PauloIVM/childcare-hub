import React from "react";
import { OtherForm, OtherProps } from "./other";

interface VaccineProps extends OtherProps {}

export function VaccineForm(props: VaccineProps) {
    return (
        <OtherForm {...props} />
    );
}
