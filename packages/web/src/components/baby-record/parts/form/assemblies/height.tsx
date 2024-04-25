import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function HeightForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (
        <FormBuilder withHeight withObservations {...props} />
    );
}