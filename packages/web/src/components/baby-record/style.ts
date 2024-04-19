import styled from "styled-components";

export const Root = styled.div`
`;

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

export const RecordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: -webkit-fill-available;
    background-color: #F7EFDA;
    border-radius: 4px;
    padding: 12px;
    justify-content: space-between;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const RecordsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: -webkit-fill-available;
    gap: 10px;
    @media (max-width: 768px) {
        gap: 6px;
    }
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
    min-height: 24px;
`;

export const RecordName = styled(RecordItem)`
    width: 100px;
    border-radius: 12px;
    color: #F7EFDA;
    background-color: #2E3B4F;
    justify-content: center;
`;
