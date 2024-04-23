import React from "react";
import { OtherForm, OtherProps } from "./other";

interface UrinationProps extends OtherProps {}

export function UrinationForm(props: UrinationProps) {
    return (
        <OtherForm {...props} />
    );
}
