import Head from "next/head";
import { GetServerSideProps } from "next";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { PageHero } from "../components/page-hero";
import { Posts as PostsComponent } from "../components/posts";

interface PostsProps {
    foo: string;
}

// TODO: Algumas coisas desse <Head> eu acredito que deveriam ser movidas para o
//       _app.tsx, por exemplo o favicon, a meta de viewport e etc. Mas outras
//       coisas devem ficar aqui mesmo, como por exemplo a title e a description.

export default function Posts(props: PostsProps) {
    return (
        <>
            <Head>
                <title>{"Posts"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>
            <main>
                <Navbar />
                <PageHero />
                <PostsComponent />
                <NavbarBottom />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
    return { props: { foo: "" } };
};
