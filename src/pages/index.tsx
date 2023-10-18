import Head from "next/head";
import { GetServerSideProps } from "next";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { PageHero } from "../components/page-hero";
import { Posts as PostsComponent } from "../components/posts";
import { Divider } from "@mui/material";
import styled from "styled-components";

interface PostsProps {
    foo: string;
}

// TODO: Algumas coisas desse <Head> eu acredito que deveriam ser movidas para o
//       _app.tsx, por exemplo o favicon, a meta de viewport e etc. Mas outras
//       coisas devem ficar aqui mesmo, como por exemplo a title e a description.

// TODO: Aparentemente o "page-hero" está usando uma section... se eu for mantê-lo dentro
//       de um container, a semantica então está errada. Trocar.

const MainWrapper = styled.div`
    display: flex;
    gap: 20px;
    background-color: #DEDBD5;
    padding: 20px;
    justify-content: center;
    @media (max-width: 768px) {
        padding: 12px;
    }
`;

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 768px) {
        display: none;
    }
`;

const LeftAccount = styled.div`
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 250px;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const LeftDisclaimer = styled.div`
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 60px;
    max-height: 60px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const LeftAds = styled.div`
    position: sticky;
    top: 76px;
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 250px;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const MidWrapper = styled.div`

`;

const RightWrapper = styled.div`
    position: sticky;
    top: 76px;
    background-color: #FFFFFF;
    max-height: 550px;
    min-width: 220px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    @media (max-width: 768px) {
        display: none;
    }
`;

export default function Posts(props: PostsProps) {
    return (
        <>
            <Head>
                <title>{"Posts"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <Navbar />
                <MainWrapper>
                    <LeftWrapper>
                        <LeftAccount />
                        <LeftDisclaimer />
                        <LeftAds>{"ADS"}</LeftAds>
                    </LeftWrapper>
                    <MidWrapper>
                        <PageHero />
                        <Divider sx={{ borderColor: "#2E3B4F", margin: "12px 0px" }} />
                        <PostsComponent />
                    </MidWrapper>
                    <RightWrapper>{"ADS"}</RightWrapper>
                </MainWrapper>
                <NavbarBottom />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async () => {
    return { props: { foo: "" } };
};
