import { Html, Head, Main, NextScript } from "next/document";
import Document, { DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => {
                return originalRenderPage({
                    enhanceApp: (App) => (props) => {
                        return sheet.collectStyles(<App {...props} />);
                    }
                });
            };
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [initialProps.styles, sheet.getStyleElement()],
            }
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang={"pt-BR"}>
                <Head />
                <body style={{ margin: "0px" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
