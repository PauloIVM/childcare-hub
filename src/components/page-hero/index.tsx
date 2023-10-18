import * as Styles from "./style";
import Link from "next/link";
import { Container } from "@mui/material";

// TODO: Talvez o ideal seja eu mostrar essa tele somente após o primeiro login
// do user. Daí acredito que o link possa mandar pra home em que explica do q se
// trata o site. Posso tbm mostrar esse carinha apenas se o user não estiver logado.
// Daí adicionar tbm um texto sugerindo dele criar um login (tipo: "cadastre-se no
// nosso site para poder usar nossas ferramentas e interagir com as postagens").

// TODO: Outra coisa que eu preciso fazer, é criar um pipeline de sign-in quando
// entrarem no site pela primeira vez. Contudo, não vou querer isso na parte com
// as postagens, pra que o conteúdo permaneça rastreável pro google.

// TODO: Depois do login, o page-hero virar um componente de publicar parece ser
// uma ótima ideia, pq aí incentiva o user a fazer uma postagem.

export function PageHero() {
    const title = "Bem vindo! 🤓"
    const paragraph = <>É sua primeira vez por aqui? Então confira a <Link href="/cover-letter">apresentação do site.</Link></>;
    return (
        <Styles.Section>
            <Container>
                <Styles.H1>{title}</Styles.H1>
                <Styles.P>{paragraph}</Styles.P>
            </Container>
        </Styles.Section>
    );
}