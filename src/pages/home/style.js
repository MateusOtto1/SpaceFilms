import styled from "styled-components";

export const ContainerCss = styled.div`
    h1 {
        text-align: center;
        margin: 4rem 0;
    }
`;

export const Btn = styled.button`
    margin-top: 5px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: 15px;
    color: #212121;
    background-color: #ffffff;
    font-weight: 1000;
    font-size: 12 px;
    cursor: pointer;
    transition: all 250ms;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: #000;
    }
`;
