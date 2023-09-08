import * as Styles from "./style";
import { Container } from "@mui/material";

export function PageHero() {
    return (
        <Styles.Section>
            <Container>
                <Styles.H1>{"Container"}</Styles.H1>
                <Styles.P>
                    {"The container centers your content horizontally. It's the most basic layout element."}
                </Styles.P>
            </Container>
        </Styles.Section>
    );
}