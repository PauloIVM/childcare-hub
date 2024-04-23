import React from "react";
import { OtherForm, OtherProps } from "./other";

interface DoctorProps extends OtherProps {}

export function DoctorForm(props: DoctorProps) {
    return (
        <OtherForm {...props} />
    );
}
