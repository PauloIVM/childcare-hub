import * as React from "react";
import { Typography } from "@mui/material";

interface Props {
    children: React.ReactNode;
}

export function Title({ children }: Props) {
    return (
        <Typography component="h1" variant="h5">{children}</Typography>
    );
}
