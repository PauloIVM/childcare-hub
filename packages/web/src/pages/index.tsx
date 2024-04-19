import Head from "next/head";
import { PageHero } from "../components/page-hero";
import { Posts as PostsComponent } from "../components/posts";
import { ColumnAdsLayout } from "../layouts";


interface PostsProps {}

// TODO: Algumas coisas desse <Head> eu acredito que deveriam ser movidas para o
//       _app.tsx, por exemplo o favicon, a meta de viewport e etc. Mas outras
//       coisas devem ficar aqui mesmo, como por exemplo a title e a description.

// TODO: Aparentemente o "page-hero" está usando uma section... se eu for mantê-lo dentro
//       de um container, a semantica então está errada. Trocar.

export default function Home({}: PostsProps) {
    return (
        <>
            <Head>
                <title>{"Posts | Nana-papais"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <ColumnAdsLayout
                    pageHero={<PageHero />}
                    body={<PostsComponent />}
                />
            </main>
        </>
    );
}
