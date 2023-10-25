import * as Styles from "./style";
import { AppBar, Toolbar, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PostIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/router";

export function NavbarBottom() {
    const router = useRouter();
    return (
        <>
            <Styles.Placeholder />
            <Styles.Root>
                <AppBar>
                    <Toolbar>
                        <Styles.IconsWrapper>
                            <Styles.IconWrapper onClick={() => router.push("/")}>
                                <Styles.HomeNotificationsBadge badgeContent={4}>
                                    <HomeIcon />
                                </Styles.HomeNotificationsBadge>
                                <Badge badgeContent={"Início"} color="default" />
                            </Styles.IconWrapper>
                            <Styles.IconWrapper onClick={() => router.push("/publish")}>
                                <PostIcon />
                                <Badge badgeContent={"Publicar"} color="default" />
                            </Styles.IconWrapper>
                            <Styles.IconWrapper onClick={() => router.push("/tools")}>
                                <StarIcon />
                                <Badge badgeContent={"Ferramentas"} color="default" />
                            </Styles.IconWrapper>
                            <Styles.IconWrapper onClick={() => router.push("/config")}>
                                <SettingsIcon />
                                <Badge badgeContent={"Configurações"} color="default" />
                            </Styles.IconWrapper>
                        </Styles.IconsWrapper>
                    </Toolbar>
                </AppBar>
            </Styles.Root>
        </>
    );
}
