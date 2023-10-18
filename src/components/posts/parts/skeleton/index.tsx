import * as Styles from "./styles";
import { Skeleton } from "@mui/material";

export function PostSkeleton() {
    return (
        <Styles.Loader>
            <Skeleton variant="circular" width={40} height={40} />
            <div style={{ display: "flex", flex: 0.3, flexDirection: "column" }}>
                <Skeleton variant="text" style={{ flex: 0.4, fontSize: "1rem" }} />
                <Skeleton variant="text" style={{ flex: 0.2, fontSize: "1rem" }} />
            </div>
            <Skeleton variant="rounded" height={90} style={{ flexBasis: "100%" }} />
            <Skeleton variant="rounded" height={30} style={{ flexBasis: "100%" }} />
        </Styles.Loader>
    );
}
