import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { updateRecord } from "../../../api/baby-record";
import * as Styles from "../style";

interface RecordConfirmProps {
    id: string;
    action: string;
    init: Date;
    setMode: React.Dispatch<React.SetStateAction<"default" | "confirm" | "hide">>;
    forceUpdate: boolean;
    setforceUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export function RecordConfirm({ id, action, init, setMode, forceUpdate, setforceUpdate }: RecordConfirmProps) {
    const [count, setCount] = React.useState<string>();
    const initParsed = init.toLocaleTimeString().slice(0, 5);

    function formatTimeDiff(s: number) {
        const days = Math.floor(s / (3600 * 24));
        const hours = Math.floor((s % (3600 * 24)) / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = s % 60;
        return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const seconds = Math.floor(((new Date()).getTime() - init.getTime()) / 1000);
            setCount(formatTimeDiff(seconds));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []); 

    function onClickConfirm() {
        updateRecord({ recordId: id, fields: { end: new Date() }})
            .then(() => {
                setMode("default");
                setforceUpdate(!forceUpdate);
            });
        // TODO: Tratar errors em cada um desses fetchs q eu estou fazendo no client...
    }

    return (
        <Styles.RecordConfirmRoot>
            <Styles.RecordConfirmName><p>{action}</p></Styles.RecordConfirmName>
            <Styles.RecordDateWrapper>
                <Styles.RecordDate>{`${initParsed} a --:--`}</Styles.RecordDate>
                <Styles.RecordDate>{count}</Styles.RecordDate>
            </Styles.RecordDateWrapper>
            <Styles.IconsConfirmeWrapper>
                <CircularProgress color={"warning"} size={20} />
                <Styles.CheckIcon color={"success"} onClick={onClickConfirm} />
            </Styles.IconsConfirmeWrapper>
        </Styles.RecordConfirmRoot>
    );
}
