import styled from "styled-components";

export const MainWrapper = styled.div`
    display: flex;
    gap: 20px;
    background-color: #DEDBD5;
    padding: 20px;
    justify-content: center;
    min-height: 80vw;
    @media (max-width: 768px) {
        padding: 12px;
    }
`;

export const LeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const LeftAccount = styled.div`
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 250px;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const LeftDisclaimer = styled.div`
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 60px;
    max-height: 60px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const LeftAds = styled.div`
    position: sticky;
    top: 76px;
    background-color: #FFFFFF;
    min-width: 220px;
    min-height: 250px;
    max-height: 250px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`;

export const MidWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 700px;
`;

export const RightWrapper = styled.div`
    position: sticky;
    top: 76px;
    background-color: #FFFFFF;
    max-height: 550px;
    min-width: 220px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    @media (max-width: 768px) {
        display: none;
    }
`;
