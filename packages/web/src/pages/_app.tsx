import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { UserDataProvider } from "@/context/user-data";

const roboto = Roboto({ weight: "400", subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.className}>
            <UserDataProvider><Component {...pageProps} /></UserDataProvider>
        </main>
    );
}
