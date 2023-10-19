import * as React from "react";
import Grid from "@mui/material/Grid";

interface Props {
    children: React.ReactNode;
}

export function LinksWrapper({ children }: Props) {
    return (
        <Grid container sx={{ gap: "24px", justifyContent: "space-between" }}>
            {children}
        </Grid>
    );
}
