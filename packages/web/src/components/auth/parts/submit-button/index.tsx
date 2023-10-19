import * as React from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

const StyledButton = styled(Button)`
    background-color: #D2E8FC;
    color: #3F3F3F;
    font-weight: bold;
    min-height: 50px;
    font-size: 16px;
    &:hover {
        background-color: #C0C7CF;
    }
`;

export function SubmitButton({ children }: Props) {
    return (
        <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            {children}
        </StyledButton>
    );
}