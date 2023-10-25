import * as Styles from "../style";
import { useRouter } from "next/router";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useUserData } from "@/context";

export function MobileUserIcon() {
    const { userData } = useUserData();
    const router = useRouter();
    if (userData.isLogged) {
        return (
            <Styles.AccountIconWrapper onClick={() => router.push("/profile")}>
                <AccountIcon />
            </Styles.AccountIconWrapper>
        );
    }
    return (
        <Styles.AccountIconWrapper onClick={() => router.push("/sign-in")}>
            <LoginIcon />
        </Styles.AccountIconWrapper>
    );
}
