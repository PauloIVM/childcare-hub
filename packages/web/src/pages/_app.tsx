import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { UserDataProvider, BabyDataProvider } from "@/context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const roboto = Roboto({ weight: "400", subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.className}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <UserDataProvider>
                    <BabyDataProvider>
                        <Component {...pageProps} />
                    </BabyDataProvider>
                </UserDataProvider>
            </LocalizationProvider>
        </main>
    );
}
