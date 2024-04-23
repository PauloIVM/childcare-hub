import React from "react";
import { OtherForm, OtherProps } from "./other";

interface WalkProps extends OtherProps {}

export function WalkForm(props: WalkProps) {
    return (
        <OtherForm {...props} />
    );
}
