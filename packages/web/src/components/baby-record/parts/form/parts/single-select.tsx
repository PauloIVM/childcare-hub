import React from "react";
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";

interface SingleSelectProps {
    label: string;
    menu: { label: string; value: string; }[];
    value: string;
    onChange: (v: string) => void;
}

export function SingleSelect({ label, menu, value, onChange }: SingleSelectProps) {
    return (
        <FormControl size={"small"}>
            <InputLabel color={"warning"}>{label}</InputLabel>
            <Select
                size={"small"}
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value)}
                color={"warning"}
            >
                {menu.map(({ value, label }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
