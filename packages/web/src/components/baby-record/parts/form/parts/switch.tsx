import React from "react";
import {
    FormControlLabel,
    Switch as UISwitch,
} from "@mui/material";

interface SwitchProps {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
}

export function Switch({ value, onChange, label }: SwitchProps) {
    return (
        <FormControlLabel
            label={label}
            control={
                <UISwitch
                    checked={value}
                    onChange={(e, v) => onChange(v)}
                    color={"warning"}
                    inputProps={{ "aria-label": "controlled" }}
                />
            }
        />
    );
}