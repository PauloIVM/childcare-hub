import React from "react";
import {
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import * as Styles from "./style";

interface AccordionProps {
    icon: React.ReactNode;
    summary: React.ReactNode;
    details: React.ReactNode | string;
}

export function Accordion({ icon, summary, details }: AccordionProps) {
    return (
        <Styles.Root>
            <MuiAccordion>
                <AccordionSummary expandIcon={icon}>{summary}</AccordionSummary>
                <AccordionDetails>{details}</AccordionDetails>
            </MuiAccordion>
        </Styles.Root>
    );
}
