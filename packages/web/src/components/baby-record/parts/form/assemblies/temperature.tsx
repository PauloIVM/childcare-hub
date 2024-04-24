import React from "react";
import { Form, FormProps } from "../parts";

export function TemperatureForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (
        <Form withTemperature withObservations {...props} />
    );
}