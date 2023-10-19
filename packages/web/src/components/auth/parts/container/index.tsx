import * as React from "react";
import Box from "@mui/material/Box";
import UIContainer from "@mui/material/Container";
import { Copyright } from "@/components/copyright";

interface Props {
    children: React.ReactNode;
}

export function Container({ children }: Props) {
    return (
        <UIContainer component="main" maxWidth="xs">
            <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {children}
            </Box>
            <Copyright />
        </UIContainer>
    );
}
