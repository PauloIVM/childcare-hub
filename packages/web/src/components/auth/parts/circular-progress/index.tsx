import {
    CircularProgress as UICircularProgress,
    circularProgressClasses
} from "@mui/material";
import styled from "styled-components";

interface Props {
    isActive: boolean;
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0px;
    .${circularProgressClasses.svg} {
        color : #D2E8FC;
    }
`;

export function CircularProgress({ isActive }: Props) {
    if (!isActive) return;
    return (
        <Wrapper><UICircularProgress /></Wrapper>
    );
}
