import Head from "next/head";
import { Container } from "@mui/material";
import { Box } from "../../../components/box";
import { BabyRecord } from "../../../components/baby-record";
import { ColumnAdsLayout } from "../../../layouts";

export default function BabyRecordPage() {
    return (
        <>
            <Head>
                <title>{"Baby Record | Nana-papais"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <ColumnAdsLayout
                    pageHero={
                        <Box>
                            <Container>
                                <h2>{"Baby Record"}</h2>
                                <p>{"Preencha e monitore as atividades do seu neném a seguir. Isto o ajudará a organizar uma rotina, e até mesmo fazer boas previsões, como saber se o choro é fome ou sono, por exemplo."}</p>
                            </Container>
                        </Box>
                    }
                    body={<BabyRecord />}
                />
            </main>
        </>
    );
}
