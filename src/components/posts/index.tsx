import React, { useEffect } from "react";
import * as Styles from "./style";
import { Post, PostSkeleton } from "./parts";
import InfiniteScroll from "react-infinite-scroll-component";

// TODO: Criar api;
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
    postDescription: "Post description - small",
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

async function getApiData() {
    return apiMock;
}

export function Posts() {
    const [hasMore, setHasMore] = React.useState(true);
    const [offset, setOffset] = React.useState(0);
    const [posts, setPosts] = React.useState<typeof apiMock>([]);
    const limit = 5;

    function onGetPosts(postsResponse: typeof apiMock) {
        if (!postsResponse?.length) {
            setHasMore(false);
            return;
        }
        setPosts([...posts, ...postsResponse]);
        setOffset(offset + limit);
    }

    function onReject() { setHasMore(false); }

    function fetchMoreData() {
        if (!hasMore) { return; }
        setTimeout(
            () => getApiData().then(onGetPosts).catch(onReject),
            2000
        )
        // getApiData().then(onGetPosts).catch(onReject);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(fetchMoreData, []);

    return (
        <Styles.Root>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<PostSkeleton />}
            >
                {posts.map((data, i) => <Post key={i} {...data} />)}
            </InfiniteScroll>
        </Styles.Root>
    );
}
