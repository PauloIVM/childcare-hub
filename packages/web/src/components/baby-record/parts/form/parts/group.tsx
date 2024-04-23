import React from "react";
import { FormGroup } from "@mui/material";
import * as Styles from "./style";

interface GroupProps {
    children: React.ReactNode;
}

export function Group({ children }: GroupProps) {
    return (
        <Styles.Root>
            <FormGroup>
                {children}
            </FormGroup>
        </Styles.Root>
    );
}
