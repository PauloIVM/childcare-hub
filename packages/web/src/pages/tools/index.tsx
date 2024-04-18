import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "../../components/navbar";
import { NavbarBottom } from "../../components/navbar-bottom";
import { Container, Divider } from "@mui/material";
import { AntiFlickLoader } from "../../components/anti-flick-loader";
import styled from "styled-components";
import BabyRecordIcon from "@mui/icons-material/Book";
import NoiseIcon from "@mui/icons-material/MusicNote";
import InfoIcon from "@mui/icons-material/Info";

// TODO: Esses componentes styled estão sendo usados no index.tsx... reutilizar...
const MainWrapper = styled.div`
    display: flex;
    gap: 20px;
    background-color: #DEDBD5;
    padding: 20px;
    justify-content: center;
    min-height: 80vw;
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 700px;
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

const Box = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 260px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

const ToolsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
`;

const ToolBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    background-color: #FFFFFF;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    &:hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }
    & svg {
        width: 35px;
        height: 35px;
    }
    & svg path {
        fill: #2E3B4F;
    }
`;

export default function Tools() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{"Ferramentas | Nana-papais"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <AntiFlickLoader />
                <Navbar />
                <MainWrapper>
                    <LeftWrapper>
                        <LeftAccount />
                        <LeftDisclaimer />
                        <LeftAds>{"ADS"}</LeftAds>
                    </LeftWrapper>
                    <MidWrapper>
                        <Box>
                            <Container>
                                <h2>{"Ferramentas"}</h2>
                                <p>{"Confira nossas principais ferramentas para auxiliá-lo na criação dos seus filhos."}</p>
                            </Container>
                        </Box>
                        <Divider sx={{ borderColor: "#2E3B4F", margin: "12px 0px" }} />
                        <ToolsWrapper>
                            <ToolBox onClick={() => router.push("/tools/baby-record")}>
                                <BabyRecordIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <NoiseIcon />
                                {"Ruído branco"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                            <ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </ToolBox>
                        </ToolsWrapper>
                    </MidWrapper>
                    <RightWrapper>{"ADS"}</RightWrapper>
                </MainWrapper>
                <NavbarBottom />
            </main>
        </>
    );
}
