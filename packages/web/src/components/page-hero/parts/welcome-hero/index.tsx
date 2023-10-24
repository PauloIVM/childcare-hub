import * as Styles from "./style";
import Link from "next/link";

export function WelcomeHero() {
    const title = "Bem vindo! 🤓"
    const paragraph = (
        <>
            {"É sua primeira vez por aqui? Então confira a "}
            <Link href="/cover-letter">{"apresentação do site"}</Link>
            {". Para utilizar nossas ferramentas e interagir com postagens, "}
            <Link href="/sign-in">{"faça seu login aqui."}</Link>
        </>
    );
    return (
        <Styles.Root>
            <Styles.H1>{title}</Styles.H1>
            <Styles.P>{paragraph}</Styles.P>
        </Styles.Root>
    );
}