import styled from "styled-components";
import {
    selectClasses,
    formControlClasses,
    formGroupClasses,
    sliderClasses,
    formLabelClasses,
    inputBaseClasses,
} from "@mui/material";

export const Root = styled.div`
    .${inputBaseClasses.root} {
        min-height: 40px;
        min-width: 210px;
    }
    .${inputBaseClasses.input} {
        font-size: 14px;
    }
    .${formLabelClasses.root} {
        font-size: 14px;
    }
    .${selectClasses.select} {
        font-size: 14px;
    }
    .${formControlClasses.root} {
        min-width: 190px;
        @media (max-width: 768px) {
            width: 100%;
        }
    }
    .${formGroupClasses.root} {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 25px;
        gap: 20px;
        font-size: 14px;
        font-weight: bold;
    }
    .${sliderClasses.root} {
        display: flex;
        width: auto;
        flex-basis: 100%;
        margin: 0px 25px 15px 20px;
        padding-top: 0px;
    }
    .${sliderClasses.markLabel} {
        top: 20px;
    }
`;

export const SliderRoot = styled.div`
    width: 100%;
`;
