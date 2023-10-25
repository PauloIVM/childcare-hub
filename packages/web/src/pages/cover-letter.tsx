import Head from "next/head";
import { GetServerSideProps } from "next";
import { Navbar } from "../components/navbar";
import { NavbarBottom } from "../components/navbar-bottom";
import { Container, Divider } from "@mui/material";
import * as authApi from "@/api/auth";

interface PageProps {
    foo: string;
}

// TODO: Ao invés de "cover-letter", talvez um simples "sobre" ("about").

export default function CoverLetter({ foo }: PageProps) {
    return (
        <>
            <Head>
                <title>{"Apresentação | Nana-papais"}</title>
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

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
    // INFO: Caso eu opte por fazer o login server-side, ficaria conforme abaixo. Ainda
    // estou inseguro de qual a melhor opção. Talvez algo que me incomode muito é o fato
    // de que eu teria que replicar isso em cada página... o next parece me induzir a
    // querer fazer client-side.

    // INFO: A opção client-side me parece um pouco mais segura no sentido de bugs de
    // concorrência, em que um user é direcionado pro login de outro. Mas por outro lado,
    // parece restringir a aplicação de forma que todas as informações paralelas do user
    // que forem surgindo precisem ser buscadas client-side. Isso não faria com que essas
    // infos ficasses irrastreáveis ao google? Isso pode não ser um problema, se as páginas
    // de cada "post" individual já carregar antes do login, ou as de ferramentas, por
    // exemplo.

    // TODO IMPORTANT: Conferir como foi feito isso no tabnews, acredito que me dará boas
    // respostas do trade-off.

    // const cookie = ctx.req.headers.cookie;
    // const res = await authApi.me(cookie);
    // console.log("res: ", res);

    return { props: { foo: "" } };
};
