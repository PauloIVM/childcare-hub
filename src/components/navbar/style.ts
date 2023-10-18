import styled from "styled-components";
import {
    inputBaseClasses,
    appBarClasses,
    toolbarClasses
} from "@mui/material";
import { Box, IconButton } from "@mui/material";

export const Root = styled(Box)`
    flex-grow: 1;
    position: sticky;
    top: 0px;
    z-index: 500;
    .${appBarClasses.root} {
        position: static;
    }
    .${toolbarClasses.root} {
        background: #2E3B4F;
    }
    & img {
        @media (max-width: 768px) {
            display: none;
        }
    }
`;

export const IconsWrapper = styled(Box)`
    display: flex;
    gap: 52px;
    flex-grow: 1;
    justify-content: flex-end;
`;

export const AccountIconWrapper = styled(IconButton)`
    display: none;
    @media (max-width: 768px) {
        color: inherit;
        display: flex;
        width: 35px;
        height: 35px;
        margin-right: 8px;
    };
    & svg {
        width: 35px;
        height: 35px;
    }
    & svg path {
        fill: #F7EFDA;
    }
`;

export const DesktopIconWrapper = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: inherit;
    @media (max-width: 768px) {
        display: none;
    };
`;

export const MobileIconWrapper = styled(IconButton)`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: inherit;
    };
`;

export const Logo = styled.div`
    margin-right: 8px;
    @media (max-width: 768px) {
        display: none;
    };
`;

export const Search = styled.div`
    position: relative;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.15);
    &:hover {
        background-color: rgba(255, 255, 255, 0.35);
    }
    margin-right: 15px;
    margin-left: 15px;
    width: auto;
    .${inputBaseClasses.root} {
        color: inherit;
    }
    .${inputBaseClasses.input} {
        padding: 8px;
        padding-left: 38px;
        width: 100%;
    }
`;

export const SearchIconWrapper = styled.div`
    padding: 0px 8px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;
