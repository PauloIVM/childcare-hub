import React from "react";
import { Form, FormProps } from "../parts";

export function DefaultForm(props: Pick<FormProps, "record" | "onClickUpdate">) {
    return (<Form withObservations {...props} />);
}