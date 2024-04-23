import React from "react";
import { OtherForm, OtherProps } from "./other";

interface CryProps extends OtherProps {}

export function CryForm(props: CryProps) {
    return (
        <OtherForm {...props} />
    );
}