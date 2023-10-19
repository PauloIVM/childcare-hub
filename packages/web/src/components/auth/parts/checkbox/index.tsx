import * as React from "react";
import {
    Checkbox as UICheckbox,
    FormControlLabel,
    checkboxClasses
} from "@mui/material";
import styled from "styled-components";

interface Props {
    label: string;
    id: string;
}

const StyledFormLabel = styled(FormControlLabel)`
    .${checkboxClasses.checked}  {
        color: #2E3B4F;
    },
`;

export function Checkbox({ label, id }: Props) {
    return (
        <StyledFormLabel
            control={<UICheckbox id={id} value={id} color="primary" />}
            label={label}
        />
    );
}
