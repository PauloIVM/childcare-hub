import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function DefaultForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (<FormBuilder withObservations {...props} />);
}