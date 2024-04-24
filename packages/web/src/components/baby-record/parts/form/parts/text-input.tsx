import React from "react";
import { TextField } from "@mui/material";

export interface TextInputProps {
    active: boolean;
    label: string;
    value: string;
    onChange: (v: string) => void;
}

export function TextInput({ active, label, value, onChange }: TextInputProps) {
    if (!active) { return; }
    return (
        <TextField
            label={label}
            value={value}
            variant={"outlined"}
            color={"warning"}
            size={"small"}
            sx={{ width: "100%" }}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}