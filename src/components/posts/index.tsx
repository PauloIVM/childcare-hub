import * as Styles from "./style";
import { Post } from "./parts/post";

// TODO: Criar api;
// TODO: Usar componente de infinity-loader;
// TODO: Melhorar estilizações dos posts, talvez um "card" não seja o melhor design
//       pra se usar aqui.
// TODO: Ajustar fontes em geral pros dispositivos mobile. Criar um theme.

const apiMock = [{
    userName: "userName",
    userDesc: "userDesc",
    postTitle: "Post Title",
    postDescription: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    postLink: "/post-link"
}, {
    userName: "userName",
    userDesc: "userDesc",
    postTitle: "Post Title",
    postDescription: "Post description Post description Post description Post description Post description Post description Post description Post description",
    postLink: "/post-link"
}, {
    userName: "userName",
    userDesc: "userDesc",
    postTitle: "Post Title",
    postDescription: "Post description Post description Post description Post description Post description Post description Post description Post description",
    postLink: "/post-link"
}, {
    userName: "userName",
    userDesc: "userDesc",
    postTitle: "Post Title",
    postDescription: "Post description Post description Post description Post description Post description Post description Post description Post description",
    postLink: "/post-link"
}, {
    userName: "userName",
    userDesc: "userDesc",
    postTitle: "Post Title",
    postDescription: "Post description Post description Post description Post description Post description Post description Post description Post description",
    postLink: "/post-link"
}];

export function Posts() {
    return (
        <Styles.Root>
            {apiMock.map((data, index) => <Post key={index} {...data}/>)}
        </Styles.Root>
    );
}
