import React from "react";
import {
    Slider as UISlider,
    SliderProps as UISliderProps
} from "@mui/material";
import * as Styles from "./style";

interface SliderProps {
    value: number;
    onChange: (v: number) => void;
    marks: UISliderProps["marks"];
    label: string;
    step?: number;
    max?: number;
    min?: number;
    defaultValue?: number;
}

export function Slider(props: SliderProps) {
    const {
        value,
        onChange,
        marks,
        label,
        min,
        step = 5,
        max = 400,
        defaultValue = 80
    } = props;
    return (
        <Styles.SliderRoot>
            <p>{label}</p>
            <UISlider
                defaultValue={defaultValue}
                max={max}
                min={min}
                step={step}
                value={value}
                onChange={(e, v) => onChange(v as number)}
                marks={marks}
                valueLabelDisplay={"auto"}
                color={"warning"}
            />
        </Styles.SliderRoot>
    );
}
