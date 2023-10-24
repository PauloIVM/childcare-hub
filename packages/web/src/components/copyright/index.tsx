import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// TODO: Atualizar href quando tiver o domínio do site

export function Copyright() {
    return (
        <Typography
            variant="body2"
            color="#565656"
            align="center"
            sx={{ mt: 8, mb: 4 }}
        >
            {'Copyright © '}
            <Link color="inherit" href="/">{"Nana-papais"}</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
