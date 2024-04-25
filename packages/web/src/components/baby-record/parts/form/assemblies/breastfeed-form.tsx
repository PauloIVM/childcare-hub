import React from "react";
import { FormBuilder, FormBuilderProps } from "../form-builder";

export function BreastFeedForm(props: Pick<FormBuilderProps, "record" | "onClickUpdate">) {
    return (
        <FormBuilder
            withBreastfeedingType
            withBreastfeedingAmount
            withObservations
            {...props}
        />
    );
}