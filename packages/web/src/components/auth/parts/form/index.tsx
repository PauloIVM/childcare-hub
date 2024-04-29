import * as React from "react";
import Box from "@mui/material/Box";

interface Props {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    children: React.ReactNode;
}

export function Form({ children, onSubmit }: Props) {
    return (
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            {children}
        </Box>
    );
}
