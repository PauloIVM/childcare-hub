import React from "react";
import { Form, FormProps } from "../parts";

export function WeightForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (
        <Form withWeight withObservations {...props} />
    );
}
