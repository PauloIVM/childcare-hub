import React from "react";
import { Button } from "@mui/material";

interface DispatchButtonProps {
    label: string;
    disabled: boolean;
    onUpdate: () => void;
}

export function DispatchButton({ disabled, onUpdate, label }: DispatchButtonProps) {
    return (
        <Button
            sx={{ width: "100%" }}
            variant={"outlined"}
            color={"warning"}
            disabled={disabled}
            onClick={onUpdate}
        >
            {label}
        </Button>
    );
}