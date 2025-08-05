import styled from 'styled-components';

export const ScreenContainer = styled.div`
    background-color: #FFFFFF;
    min-height: 100vh;
    padding: 68px 36px 0px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LogoImage = styled.img`
    width: 180px;
    height: 178px;
    margin-bottom: 33px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 6px;

    input {
        height: 45px;
        padding: 0 11px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        &::placeholder {
            color: #DBDBDB;
        }
    }

    button {
        height: 45px;
        background-color: #52B6FF;
        color: #FFFFFF;
        border: none;
        border-radius: 5px;
        font-size: 21px;
        margin-top: 24px;
    }
`;

export const StyledLink = styled.p`
    font-size: 14px;
    color: #52B6FF;
    text-decoration: underline;
    margin-top: 25px;
    cursor: pointer;
`;