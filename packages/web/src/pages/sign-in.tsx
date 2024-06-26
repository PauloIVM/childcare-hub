import Head from "next/head";
import { Navbar } from "@/components/navbar";
import { NavbarBottom } from "@/components/navbar-bottom";
import { Auth } from "@/components/auth";

interface Props {}

export default function SignIn({}: Props) {
    return (
        <>
            <Head>
                <title>{"Login | Nana-papais"}</title>
                <meta name={"description"} content={""} />
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
                <link rel={"icon"} href={"/favicon.svg"} />
            </Head>
            <main>
                <Navbar />
                <Auth assembly={"sign-in"} />
                <NavbarBottom />
            </main>
        </>
    );
}
