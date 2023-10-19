import * as Styles from "../style";
import { Badge } from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useUserData } from "@/context/user-data";

export function DesktopUserIcon() {
    const { userData } = useUserData();

    if (userData.isLogged) {
        return (
            <Styles.DesktopIconWrapper href={"/profile"}>
                <AccountIcon />
                <Badge badgeContent={"Perfil"} color={"default"} />
            </Styles.DesktopIconWrapper>
        );
    }

    return (
        <Styles.DesktopIconWrapper href={"/sign-in"}>
            <LoginIcon />
            <Badge badgeContent={"Logar"} color={"default"} />
        </Styles.DesktopIconWrapper>
    );
}
