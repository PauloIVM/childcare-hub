import { Fade as UIFade } from "@mui/material";

interface Props {
    children: React.ReactElement;
    show: boolean;
    keepMounted?: boolean;
}

export function Fade({ children, show, keepMounted }: Props) {
    if (keepMounted) {
        return (
            <UIFade in={show} timeout={1000}>
                <div style={{ display: show ? "block" : "none"}}>
                    {children}
                </div>
            </UIFade>
        );
    }
    return (
        <UIFade in={show} timeout={1000}>
            {show ? children : <div></div>}
        </UIFade>
    );
}
