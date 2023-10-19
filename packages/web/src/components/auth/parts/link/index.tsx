import * as React from "react";
import UILink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import styled from "styled-components";

interface Props {
    text: string;
    href: string;
}

const StyledLink = styled(UILink)`
    color: #2E3B4F;
    text-decoration-color: #2E3B4F;
`;

export function Link({ text, href }: Props) {
    return (
        <Grid item>
            <StyledLink href={href} variant="body2">{text}</StyledLink>
        </Grid>
    );
}
