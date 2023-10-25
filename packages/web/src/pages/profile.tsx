import Head from "next/head";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { Container, Divider } from "@mui/material";
import { AntiFlickLoader } from "../components/anti-flick-loader";
import { Auth } from "../components/auth";
import styled from "styled-components";

const MainWrapper = styled.div`
    display: flex;
    background-color: #DEDBD5;
    padding: 20px;
    justify-content: center;
    @media (max-width: 768px) {
        padding: 12px;
    }
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 260px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const AuthBox = styled(Box)`
    padding: 0px 24px;
    @media (max-width: 768px) {
        padding: 0px 16px;
    }
`;

export default function Profile() {
    return (
        <>
            <Head>
                <title>{"Perfil | Nana-papais"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <AntiFlickLoader />
                <Navbar />
                <MainWrapper>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            maxWidth: "1200px",
                            flexWrap: "wrap",
                            gap: "20px"
                        }}
                    >
                        <Box>
                            <Container>
                                <h2>{"Perfil"}</h2>
                                <p>{"avatar..."}</p>
                                <p>{"nome... (editar nome)"}</p>
                                <p>{"descrição... (editar descrição)"}</p>
                            </Container>
                        </Box>
                        <AuthBox>
                            <Auth assembly={"sign-out"} />
                        </AuthBox>
                        <Box style={{ width: "100%" }}>
                            <Container>
                                <h2>{"Suas postagens / iterações"}</h2>
                            </Container>
                            <Container><Divider /></Container>
                            <Container>
                                <h3>{"Post 1"}</h3>
                                <p>{"Lorem ipsum dolor"}</p>
                            </Container>
                            <Container><Divider /></Container>
                            <Container>
                                <h3>{"Post 2"}</h3>
                                <p>{"Lorem ipsum dolor"}</p>
                            </Container>
                            <Container><Divider /></Container>
                            <Container>
                                <h3>{"Post 3"}</h3>
                                <p>{"Lorem ipsum dolor"}</p>
                            </Container>
                        </Box>
                    </div>
                </MainWrapper>
                <NavbarBottom />
            </main>
        </>
    );
}
