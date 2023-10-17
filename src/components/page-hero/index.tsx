import * as Styles from "./style";
import Link from "next/link";
import { Container } from "@mui/material";

// INFO: Talvez o ideal seja eu mostrar essa tele somente após o primeiro login
// do user. Daí acredito que o link possa mandar pra home em que explica do q se
// trata o site.

// TODO: Outra coisa que eu preciso fazer, é criar um pipeline de sign-in quando
// entrarem no site pela primeira vez. Contudo, não vou querer isso na parte com
// as postagens, pra que o conteúdo permaneça rastreável pro google.

export function PageHero() {
    const title = "Bem vindo! 🤓"
    const paragraph = <>É sua primeira vez por aqui? Então confira a <Link href="/">apresentação do site.</Link></>;
    return (
        <Styles.Section>
            <Container>
                <Styles.H1>{title}</Styles.H1>
                <Styles.P>{paragraph}</Styles.P>
            </Container>
        </Styles.Section>
    );
}