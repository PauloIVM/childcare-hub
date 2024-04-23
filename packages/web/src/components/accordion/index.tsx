import React from "react";
import {
    Accordion as MuiAccordion,
    AccordionSummary,
    AccordionDetails,
    IconButton
} from "@mui/material";
import * as Styles from "./style";

interface AccordionProps {
    icon: React.ReactNode;
    summary: React.ReactNode;
    details: React.ReactNode | string;
    trigger?: "summary" | "icon";
    defaultExpanded?: boolean;
}

export function Accordion({ icon, summary, details, trigger = "icon", defaultExpanded }: AccordionProps) {
    const [expanded, setExpanded] = React.useState(false);
    function onClick() {
        setExpanded(!expanded);
    }
    return (
        <Styles.Root $trigger={trigger}>
            <MuiAccordion
                defaultExpanded={defaultExpanded}
                expanded={trigger === "icon" ? expanded : undefined}
            >
                <AccordionSummary
                    expandIcon={<IconButton onClick={onClick}>{icon}</IconButton>}
                >
                    {summary}
                </AccordionSummary>
                <AccordionDetails>{details}</AccordionDetails>
            </MuiAccordion>
        </Styles.Root>
    );
}
