import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
}

export function TextInput({ label, value, onChange }: TextInputProps) {
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