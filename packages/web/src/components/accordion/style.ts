import styled from "styled-components";
import {
    accordionClasses,
    accordionSummaryClasses,
    accordionDetailsClasses
} from "@mui/material";

export const Root = styled.div`
    width: 100%;
    .${accordionClasses.root} {
        background-color: initial;
        width: 100%;
        box-shadow: unset;
    }
    .${accordionSummaryClasses.root} {
        padding: 0px;
        min-height: unset;
    }
    .${accordionSummaryClasses.content} {
        margin: 0px;
    }
    .${accordionDetailsClasses.root} {
        padding: 0px;
    }
`;
