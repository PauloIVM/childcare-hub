import styled from "styled-components";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 24px;
    gap: 12px;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background: linear-gradient(67.58deg, #d2e8fc 22.4%, #b6d9fc 90.14%);
`;

export const H1 = styled.h1`
   color: #3F3F3F;
   margin: 0px;
`;

export const P = styled.p`
    margin: 0px;
    color: #3F3F3F;
    line-height: 22px;
    & a {
        color: #3B5998;
    }
`;
