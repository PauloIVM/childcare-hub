import Head from "next/head";
import { GetServerSideProps } from "next";
import { Navbar } from "../components/navbar";
import { PageHero } from "../components/page-hero";
import { Card } from "../components/card";
import { Container, Divider } from "@mui/material";

interface PageProps {
    foo: string;
}

export default function Home({ foo }: PageProps) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <PageHero />
                <Container sx={{ display: "flex", gap: "18px", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-around", padding: "18px" }}>
                    <Card />
                    <Card />
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h2>{"More Content"}</h2>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    return { props: { foo: "" } };
};
