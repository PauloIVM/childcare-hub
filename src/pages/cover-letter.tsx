import Head from "next/head";
import { GetServerSideProps } from "next";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { Container, Divider } from "@mui/material";

interface PageProps {
    foo: string;
}

export default function CoverLetter({ foo }: PageProps) {
    return (
        <>
            <Head>
                <title>{"Childcare | Apresentação"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <Navbar />
                <Container>
                    <h2>{"Apresentação"}</h2>
                    <p>{"to-do: implementar..."}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <Container><Divider /></Container>
                <Container>
                    <h3>{"More Content"}</h3>
                    <p>{"Lorem ipsum dolor"}</p>
                </Container>
                <NavbarBottom />
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    return { props: { foo: "" } };
};
