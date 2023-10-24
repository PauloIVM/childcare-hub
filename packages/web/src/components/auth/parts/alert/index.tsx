import { Alert as UIAlert, AlertProps } from "@mui/material";

interface Props extends AlertProps {
    isActive: boolean;
}

export function Alert({ isActive, ...otherProps }: Props) {
    if (!isActive) return <></>;
    return (<UIAlert {...otherProps} />);
}
