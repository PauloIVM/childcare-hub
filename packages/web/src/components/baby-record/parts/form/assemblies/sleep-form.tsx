import React from "react";
import { Form, FormProps } from "../parts";

export function SleepForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (
        <Form withSleepQuality withObservations {...props} />
    );
}