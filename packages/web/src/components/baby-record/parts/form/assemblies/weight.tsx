import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function WeightForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (
        <FormBuilder withWeight withObservations {...props} />
    );
}
