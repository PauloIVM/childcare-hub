import styled from "styled-components";
import { appBarClasses, toolbarClasses, badgeClasses } from "@mui/material";
import { Box, Badge, IconButton } from "@mui/material";

export const Root = styled(Box)`
    display: none;    
    flex-grow: 1;
    position: fixed;
    width: 100%;
    bottom: 0px;
    z-index: 500;
    .${appBarClasses.root} {
        position: static;
    }
    .${toolbarClasses.root} {
        background: #FFFFFF;
    }
    & svg {
        fill: #2E3B4F;
    }
    @media (max-width: 768px) {
        display: flex;
    };
`;

export const Placeholder = styled.div`
    display: none;    
    flex-grow: 1;
    position: sticky;
    bottom: 0px;
    min-height: 56px;
    @media (max-width: 768px) {
        display: flex;
    };
`;

export const IconsWrapper = styled(Box)`
    display: flex;
    gap: 28px;
    flex-grow: 1;
    justify-content: space-around;
    padding-right: 18px;
    .${badgeClasses.badge} {
        font-size: 10px;
        color: #2E3B4F;
    }
`;

export const IconWrapper = styled(IconButton)`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    color: inherit;
`;

export const HomeNotificationsBadge = styled(Badge)`
    .${badgeClasses.badge} {
        font-size: 12px;
        color: #FFFFFF;
        background-color: #D32F2F;
    }
`;
