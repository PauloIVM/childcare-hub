import styled from "styled-components";
import {
    avatarClasses,
    cardHeaderClasses,
    buttonBaseClasses,
    cardActionsClasses
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Card } from "@mui/material";

export const PostWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    @media (max-width: 768px) {
        border-radius: 0px;
    };
    .${avatarClasses.root} {
        background-color: #F44336;
    }
    .${cardHeaderClasses.root} {
        padding: 0px;
    }
    .${cardActionsClasses.root} {
        display: flex;
        gap: 12px;
        padding: 0px;
    }
    .${buttonBaseClasses.root} {
        padding: 0px;
    }
`;

export const PostTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const PostTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const PostDescription = styled.div`
    font-size: 16px;
    color: #565656;
    & a {
        font-weight: bold;
        text-decoration: auto;
        color: #3B5998;
        &:hover {
            text-decoration: underline !important;
        }
    }
`;

export const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
`;

export const ExpandIconWrapper = styled(IconButton)`
    flex-grow: 1;
    justify-content: flex-end;
    & svg {
        transform: rotate(-90deg);
    }
`;
