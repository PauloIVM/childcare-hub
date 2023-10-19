import styled from "styled-components";
import {
    Card,
    IconButton,
    avatarClasses,
    buttonBaseClasses,
    cardHeaderClasses,
    cardActionsClasses
} from "@mui/material";

export const PostWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    gap: 16px;
    padding: 24px;
    .${avatarClasses.root} {
        color: #F7EFDA;
        background-color: #2E3B4F;
        font-weight: bold;
    }
    .${cardHeaderClasses.root} {
        padding: 0px;
    }
    .${cardActionsClasses.root} {
        display: flex;
        padding: 0px;
    }
    .${buttonBaseClasses.root} {
        padding: 0px;
    }
`;

export const PostTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

export const LikesTotal = styled.span`
    font-size: 11px;
    color: #565656;
    margin-left: 2px;
    margin-right: 12px;
`;

export const ExpandIconWrapper = styled(IconButton)`
    flex-grow: 1;
    justify-content: flex-end;
    & svg {
        transform: rotate(-90deg);
    }
`;
