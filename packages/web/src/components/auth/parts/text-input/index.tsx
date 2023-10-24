import * as React from "react";
import { TextField, outlinedInputClasses } from "@mui/material";
import styled from "styled-components";

interface Props {
    id: string;
    label: string;
    autoComplete?: string;
    type?: "password";
}

const StyledInput = styled(TextField)`
    .${outlinedInputClasses.focused} {
        color: #2E3B4F !important;
        & fieldset {
            border-color: #2E3B4F !important;
        }
    }
`;

export function TextInput({ id, label, autoComplete, type }: Props) {
    return (
        <StyledInput
            margin="normal"
            required
            fullWidth
            id={id}
            label={label}
            name={id}
            type={type}
            autoComplete={autoComplete}
        />
    );
}