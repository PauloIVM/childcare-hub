import * as Styles from "./style";
import { AppBar, Toolbar, InputBase, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PostIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import ContactsIcon from "@mui/icons-material/Contacts";

export function Navbar() {
    return (
        <Styles.Root>
            <AppBar>
                <Toolbar>
                    <Styles.AccountIconWrapper>
                        <AccountIcon />
                    </Styles.AccountIconWrapper>
                    <Styles.Logo>{"LOGO"}</Styles.Logo>
                    <Styles.Search>
                        <Styles.SearchIconWrapper>
                            <SearchIcon />
                        </Styles.SearchIconWrapper>
                        <InputBase placeholder={"Pesquisar..."} />
                    </Styles.Search>
                    <Styles.IconsWrapper>
                        <Styles.DesktopIconWrapper href={"/"}>
                            <Badge badgeContent={4} color={"error"}>
                                <HomeIcon />
                            </Badge>
                            <Badge badgeContent={"Início"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper href={"/publish"}>
                            <PostIcon />
                            <Badge badgeContent={"Publicação"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper href={"/tools"}>
                            <StarIcon />
                            <Badge badgeContent={"Ferramentas"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper>
                            <ContactsIcon />
                            <Badge badgeContent={"Contatos"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.MobileIconWrapper>
                            <MenuIcon />
                            <Badge badgeContent={"Menu"} color={"default"} />
                        </Styles.MobileIconWrapper>
                        <Styles.DesktopIconWrapper href={"/config"}>
                            <SettingsIcon />
                            <Badge badgeContent={"Configurações"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper>
                            <MenuIcon />
                            <Badge badgeContent={"Menu"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                    </Styles.IconsWrapper>
                </Toolbar>
            </AppBar>
        </Styles.Root>
    );
}
