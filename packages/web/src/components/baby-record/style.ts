import styled from "styled-components";

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

export const AddRecordWrapper = styled(RecordWrapper)`
    background: linear-gradient(67deg, #d2e8fc 22%, #b6d9fc 90%);
    &:hover {
        background: linear-gradient(67deg, #b6c9da 22%, #97b4d1 90%);
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

export const RecordDateWrapper = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    width: min-content;
    justify-content: center;
`;

export const RecordDate = styled(RecordItem)`
    font-size: 11px;
    word-spacing: 3px;
    min-height: unset !important;
`;
