import styled from "styled-components";

export const Section = styled.div`
    display: flex;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    background: linear-gradient(67.58deg, #d2e8fc 22.4%, #b6d9fc 90.14%);
`;

export const H1 = styled.h1`
   color: #3F3F3F;
`;

export const P = styled.p`
    color: #3F3F3F;
    & a {
        color: #3B5998;
    }
`;
