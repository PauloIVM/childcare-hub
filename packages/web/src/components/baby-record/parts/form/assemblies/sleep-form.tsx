import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function SleepForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (
        <FormBuilder withSleepQuality withObservations {...props} />
    );
}