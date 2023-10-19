import * as Styles from "./style";
import { Avatar } from "@mui/material";
import PostIcon from "@mui/icons-material/PostAdd";

interface Props {
    userName: string;
}

export function PublishHero({ userName }: Props) {
    return (
        <Styles.Root>
            <Avatar>{userName[0].toUpperCase()}</Avatar>
            <Styles.Wrapper href="/publish">
                <PostIcon />
                {"Publicar..."}
            </Styles.Wrapper>
        </Styles.Root>
    );
}