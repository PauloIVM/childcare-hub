import React from "react";
import { Form, FormProps } from "../parts";

export function BreastFeedForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (
        <Form
            withBreastfeedingType
            withBreastfeedingAmount
            withObservations
            {...props}
        />
    );
}