import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function TemperatureForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (
        <FormBuilder withTemperature withObservations {...props} />
    );
}