import * as React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
    isActive: boolean;
    style?: React.CSSProperties
}

const StyledButton = styled(Button)`
    background-color: #D2E8FC;
    color: #3F3F3F;
    font-weight: bold;
    min-height: 50px;
    font-size: 16px;
    margin-top: 24px;
    margin-bottom: 16px;
    width: 100%;
    &:hover {
        background-color: #C0C7CF;
    }
`;

export function SubmitButton({ children, isActive, style }: Props) {
    if (!isActive) return;
    return (
        <StyledButton style={style} type="submit" variant="contained">
            {children}
        </StyledButton>
    );
}