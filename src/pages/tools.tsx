import Head from "next/head";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { Container, Divider } from "@mui/material";

export default function Tools() {
    return (
        <>
            <Head>
                <title>{"Ferramentas"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>
            <main>
                <Navbar />
                <Container>
                    <h2>{"Ferramentas"}</h2>
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
                <Container><Divider /></Container>
                <NavbarBottom />
            </main>
        </>
    );
}
