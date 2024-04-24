import React from "react";
import {
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";

interface SingleSelectProps {
    active: boolean;
    label: string;
    menu: { label: string; value: string; }[];
    value: string;
    onChange: (v: string) => void;
}

export function SingleSelect({ active, label, menu, value, onChange }: SingleSelectProps) {
    if (!active) { return; }
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
                {menu.map(({ value, label }, i) => (
                    <MenuItem key={i} value={value}>{label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
