import React from "react";
import { OtherForm, OtherProps } from "./other";

interface PoopProps extends OtherProps {}

export function PoopForm(props: PoopProps) {
    return (
        <OtherForm {...props} />
    );
}
