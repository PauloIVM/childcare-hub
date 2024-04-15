import * as React from "react";
import UIButton from "@mui/material/Button";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    style?: React.CSSProperties;
}

const StyledButton = styled(UIButton)`
    background-color: #D2E8FC;
    color: #3F3F3F;
    font-weight: bold;
    min-height: 50px;
    font-size: 16px;
    width: 100%;
    &:hover {
        background-color: #C0C7CF;
    }
`;

export function Button({ children, onClick, style }: Props) {
    return (
        <StyledButton style={style} type="button" variant="contained" onClick={onClick}>
            {children}
        </StyledButton>
    );
}