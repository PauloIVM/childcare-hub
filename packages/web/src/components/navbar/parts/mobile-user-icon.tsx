import * as Styles from "../style";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useUserData } from "@/context/user-data";

export function MobileUserIcon() {
    const { userData } = useUserData();

    if (userData.isLogged) {
        return (
            <Styles.AccountIconWrapper href={"/profile"}>
                <AccountIcon />
            </Styles.AccountIconWrapper>
        );
    }
    return (
        <Styles.AccountIconWrapper href={"/sign-in"}>
            <LoginIcon />
        </Styles.AccountIconWrapper>
    );
}
