import * as Styles from "../style";
import { Badge } from "@mui/material";
import { useRouter } from "next/router";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useUserData } from "@/context";

export function DesktopUserIcon() {
    const { userData } = useUserData();
    const router = useRouter();
    if (userData.isLogged) {
        return (
            <Styles.DesktopIconWrapper onClick={() => router.push("/profile")}>
                <AccountIcon />
                <Badge badgeContent={"Perfil"} color={"default"} />
            </Styles.DesktopIconWrapper>
        );
    }

    return (
        <Styles.DesktopIconWrapper onClick={() => router.push("/sign-in")}>
            <LoginIcon />
            <Badge badgeContent={"Logar"} color={"default"} />
        </Styles.DesktopIconWrapper>
    );
}
