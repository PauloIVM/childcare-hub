import React from "react";
import { OtherForm, OtherProps } from "./other";

interface BathProps extends OtherProps {}

export function BathForm(props: BathProps) {
    return (
        <OtherForm {...props} />
    );
}