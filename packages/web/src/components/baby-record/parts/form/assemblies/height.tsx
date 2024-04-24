import React from "react";
import { Form, FormProps } from "../parts";

export function HeightForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (
        <Form withHeight withObservations {...props} />
    );
}