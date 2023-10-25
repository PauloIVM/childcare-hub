import * as Styles from "./style";
import { useRouter } from "next/router";
import Image from "next/image";
import { AppBar, Toolbar, InputBase, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PostIcon from "@mui/icons-material/PostAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import StarIcon from "@mui/icons-material/Star";
import { DesktopUserIcon, MobileUserIcon } from "./parts";

export function Navbar() {
    const router = useRouter();
    return (
        <Styles.Root>
            <AppBar>
                <Toolbar>
                    <MobileUserIcon />
                    <Image src={"/logo-small.svg"} alt={"logo"} width={118} height={43} />
                    <Styles.Search>
                        <Styles.SearchIconWrapper>
                            <SearchIcon />
                        </Styles.SearchIconWrapper>
                        <InputBase placeholder={"Pesquisar..."} />
                    </Styles.Search>
                    <Styles.IconsWrapper>
                        <Styles.DesktopIconWrapper onClick={() => router.push("/")}>
                            <Badge badgeContent={4} color={"error"}>
                                <HomeIcon />
                            </Badge>
                            <Badge badgeContent={"Início"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper onClick={() => router.push("/publish")}>
                            <PostIcon />
                            <Badge badgeContent={"Publicar"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <Styles.DesktopIconWrapper onClick={() => router.push("/tools")}>
                            <StarIcon />
                            <Badge badgeContent={"Ferramentas"} color={"default"} />
                        </Styles.DesktopIconWrapper>
                        <DesktopUserIcon />
                        <Styles.MobileIconWrapper>
                            <MenuIcon />
                            <Badge badgeContent={"Menu"} color={"default"} />
                        </Styles.MobileIconWrapper>
                        <Styles.DesktopIconWrapper onClick={() => router.push("/config")}>
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
