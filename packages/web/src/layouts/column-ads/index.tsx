import { Navbar } from "../../components/navbar";
import { NavbarBottom } from "../../components/navbar-bottom";
import { Divider } from "@mui/material";
import { AntiFlickLoader } from "../../components/anti-flick-loader";
import * as Styles from "./style";

interface ColumnAdsLayoutProps {
    pageHero: React.ReactNode;
    body: React.ReactNode;
}

export function ColumnAdsLayout({ pageHero, body }: ColumnAdsLayoutProps) {
    return (
        <>
            <AntiFlickLoader />
            <Navbar />
            <Styles.MainWrapper>
                <Styles.LeftWrapper>
                    <Styles.LeftAccount />
                    <Styles.LeftDisclaimer />
                    <Styles.LeftAds>{"ADS"}</Styles.LeftAds>
                </Styles.LeftWrapper>
                <Styles.MidWrapper>
                    {pageHero}
                    <Divider sx={{ borderColor: "#2E3B4F", margin: "12px 0px" }} />
                    {body}
                </Styles.MidWrapper>
                <Styles.RightWrapper>{"ADS"}</Styles.RightWrapper>
            </Styles.MainWrapper>
            <NavbarBottom />
        </>
    );
}
