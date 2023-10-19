import styled from "styled-components";
import { avatarClasses } from "@mui/material";

export const Root = styled.div`
    display: flex;
    flex-direction: row;
    padding: 12px 24px;
    gap: 12px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background: linear-gradient(67.58deg, #d2e8fc 22.4%, #b6d9fc 90.14%);
    .${avatarClasses.root} {
        color: #F7EFDA;
        background-color: #2E3B4F;
        font-weight: bold;
    }
    & svg path {
        fill: #2E3B4F;
    }
    & a {
        color: #2E3B4F;
        text-decoration: none;
    }
`;

export const Wrapper = styled.a`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    border-radius: 20px;
    padding: 0px 12px;
    gap: 8px;
    align-items: center;
    border: 1px solid #2E3B4F;
    color: #3F3F3F;
    margin: 0px;
    background-color: #E1E9F0;
    &:hover {
        background-color: #C0C7CF;
    }
`;
