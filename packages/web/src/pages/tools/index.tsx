import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { ColumnAdsLayout } from "../../layouts";
import BabyRecordIcon from "@mui/icons-material/Book";
import NoiseIcon from "@mui/icons-material/MusicNote";
import InfoIcon from "@mui/icons-material/Info";
import * as Styles from "./style";

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
                <ColumnAdsLayout
                    pageHero={
                        <Styles.Box>
                            <Container>
                                <h2>{"Ferramentas"}</h2>
                                <p>{"Confira nossas principais ferramentas para auxiliá-lo na criação dos seus filhos."}</p>
                            </Container>
                        </Styles.Box>
                    }
                    body={
                        <Styles.ToolsWrapper>
                            <Styles.ToolBox onClick={() => router.push("/tools/baby-record")}>
                                <BabyRecordIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <NoiseIcon />
                                {"Ruído branco"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                            <Styles.ToolBox>
                                <InfoIcon />
                                {"Baby Record"}
                            </Styles.ToolBox>
                        </Styles.ToolsWrapper>
                    }
                />
            </main>
        </>
    );
}
