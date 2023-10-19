import * as Styles from "./style";
import {
    Avatar,
    CardActions,
    CardHeader,
    IconButton,
} from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import MoreIcon from "@mui/icons-material/MoreHoriz";

// TODO: Num futuro, acho que seria bacana permitir o pessoal anexar imagens. Quando
// tivermos isso feito, seria legal esse carinha aqui mostrar a imagem anexada.

// TODO: Implementar dinamicamente a info de quantas "curtidas" o post têm.

interface PostProps {
    userName: string;
    userDesc: string;
    postTitle: string;
    postDescription: string;
    postLink: string;
}

export function Post(props: PostProps) {
    const { userName, userDesc, postTitle, postDescription, postLink } = props;
    const maxDescriptionSize = 200;
    const description = postDescription.slice(0, maxDescriptionSize);
    const keepReadingLink = postDescription.length > maxDescriptionSize && <Link href={postLink}>{" ...continuar lendo"}</Link>;
    
    return (
        <Styles.PostWrapper>
            <CardHeader
                avatar={<Avatar>{userName[0].toUpperCase()}</Avatar>}
                action={<IconButton><MoreIcon /></IconButton>}
                title={<Styles.UserName>{userName}</Styles.UserName>}
                subheader={userDesc}
            />
            <Styles.PostTextWrapper>
                <Styles.PostTitle>{postTitle}</Styles.PostTitle>
                <Styles.PostDescription>{description}{keepReadingLink}</Styles.PostDescription>
            </Styles.PostTextWrapper>
            <CardActions>
                <IconButton><FavoriteIcon /></IconButton>
                <Styles.LikesTotal>{"1,2 mil"}</Styles.LikesTotal>
                <IconButton><ShareIcon /></IconButton>
                <Styles.ExpandIconWrapper>
                    <ExpandMoreIcon />
                </Styles.ExpandIconWrapper>
            </CardActions>
        </Styles.PostWrapper>
    );
}
