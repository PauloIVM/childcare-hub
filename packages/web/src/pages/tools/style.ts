import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 260px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const ToolsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
`;

export const ToolBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    background-color: #FFFFFF;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    &:hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }
    & svg {
        width: 35px;
        height: 35px;
    }
    & svg path {
        fill: #2E3B4F;
    }
`;
