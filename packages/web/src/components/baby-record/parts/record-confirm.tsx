import React, { useEffect } from "react";
import { Delete } from "@mui/icons-material";
import { IconButton, CircularProgress } from "@mui/material";
import * as Styles from "../style";

interface RecordConfirmProps {
    id: string;
    action: string;
    init: Date;
    onClickConfirm: () => void;
    onClickDelete: () => void;
}

export function RecordConfirm({ id, action, init, onClickConfirm, onClickDelete }: RecordConfirmProps) {
    const [count, setCount] = React.useState<string>("0:00:00:00");
    const initParsed = init.toLocaleTimeString().slice(0, 5);

    function formatTimeDiff(s: number) {
        const days = Math.floor(s / (3600 * 24));
        const hours = Math.floor((s % (3600 * 24)) / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = s % 60;
        return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        setCount("0:00:00:00");
        const intervalId = setInterval(() => {
            const seconds = Math.floor(((new Date()).getTime() - init.getTime()) / 1000);
            setCount(formatTimeDiff(seconds));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [id]); 

    return (
        <Styles.RecordConfirmRoot>
            <Styles.RecordConfirmName><p>{action}</p></Styles.RecordConfirmName>
            <Styles.RecordDateWrapper>
                <Styles.RecordDate>{`${initParsed} a --:--`}</Styles.RecordDate>
                <Styles.RecordDate>{count}</Styles.RecordDate>
            </Styles.RecordDateWrapper>
            <Styles.IconsConfirmeWrapper>
                <CircularProgress color={"warning"} size={20} />
                <IconButton onClick={onClickDelete}>
                    <Delete color={"error"} />
                </IconButton>
                <Styles.CheckIcon color={"success"} onClick={onClickConfirm} />
            </Styles.IconsConfirmeWrapper>
        </Styles.RecordConfirmRoot>
    );
}
