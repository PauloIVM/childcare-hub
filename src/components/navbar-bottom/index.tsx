import * as Styles from "./style";
import { AppBar, Toolbar, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PostIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";

export function NavbarBottom() {
    return (
        <Styles.Root>
            <AppBar>
                <Toolbar>
                    <Styles.IconsWrapper>
                        <Styles.IconWrapper>
                            <Styles.HomeNotificationsBadge badgeContent={4}>
                                <HomeIcon />
                            </Styles.HomeNotificationsBadge>
                            <Badge badgeContent={"Início"} color="default" />
                        </Styles.IconWrapper>
                        <Styles.IconWrapper>
                            <PostIcon />
                            <Badge badgeContent={"Publicação"} color="default" />
                        </Styles.IconWrapper>
                        <Styles.IconWrapper>
                            <StarIcon />
                            <Badge badgeContent={"Ferramentas"} color="default" />
                        </Styles.IconWrapper>
                        <Styles.IconWrapper>
                            <SettingsIcon />
                            <Badge badgeContent={"Configurações"} color="default" />
                        </Styles.IconWrapper>
                    </Styles.IconsWrapper>
                </Toolbar>
            </AppBar>
        </Styles.Root>
    );
}
