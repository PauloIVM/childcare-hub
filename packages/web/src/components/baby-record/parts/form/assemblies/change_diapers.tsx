import React from "react";
import { OtherForm, OtherProps } from "./other";

interface ChangeDiapersProps extends OtherProps {}

export function ChangeDiapersForm(props: ChangeDiapersProps) {
    return (
        <OtherForm {...props} />
    );
}