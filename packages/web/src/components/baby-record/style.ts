import styled from "styled-components";
import { iconButtonClasses } from "@mui/material";
import { Pause } from "@mui/icons-material";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    @media (max-width: 768px) {
        gap: 16px;
        padding: 16px;
    }
    & hr {
        width: -webkit-fill-available;
    }
`;

export const RecordRoot = styled.div`
    display: flex;
    flex-direction: row;
    width: -webkit-fill-available;
    background-color: #F7EFDA;
    border-radius: 4px;
    padding: 12px;
    justify-content: space-between;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    .${iconButtonClasses.root} {
        padding: 0px;
    }
`;

export const RecordConfirmRoot = styled(RecordRoot)`
    background-color: #E1E9F0 !important;
`;

export const CheckIcon = styled(Pause)`
    border: 1px solid #2e7d32;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const RecordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const RecordsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    gap: 10px;
    min-height: 330px;
    & svg {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        min-height: 310px;
        gap: 6px;
    }
`;

export const IconsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    margin-right: 6px;
`;

export const IconsConfirmeWrapper = styled(IconsWrapper)`
    gap: 20px;
    @media (max-width: 768px) {
        gap: 15px;
    }
`;

export const AddRecordWrapper = styled(RecordRoot)`
    background: linear-gradient(67deg, #d2e8fc 22%, #b6d9fc 90%);
    &:hover {
        cursor: pointer;
    }
`;

export const RecordItem = styled.div`
    display: flex;
    align-items: center;
    min-height: 30px;
    white-space: nowrap;
`;

export const RecordName = styled(RecordItem)`
    width: 30%;
    border-radius: 15px;
    color: #F7EFDA;
    background-color: #2E3B4F;
    justify-content: center;
    min-height: unset !important;
    & p {
        margin: 0px;
        padding: 0px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        @media (max-width: 768px) {
            font-size: 12px;
        }
    }
`;

export const RecordConfirmName = styled(RecordName)`
    width: 29%;
`;

export const RecordDateWrapper = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    width: min-content;
    justify-content: center;
    min-height: 31px;
    align-items: flex-start;
`;

export const RecordDate = styled(RecordItem)`
    font-size: 11px;
    word-spacing: 3px;
    min-height: unset !important;
`;

export const InsertWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InsertText = styled.div`
    display: flex;
    font-weight: bold;
    margin-top: 16px;
    font-size: 14px;
`;

export const InsertBoxesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: flex-start;
`;

export const InsertBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 10px;
    text-align: center;
    font-weight: bold;
    background-color: #F7EFDA;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    font-size: 12px;
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
