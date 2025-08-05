import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Menu() {
    return (
        <MenuContainer>
            <StyledLink to="/MeusHabitos">Hábitos</StyledLink>
            <StyledLink to="/hoje" className="hoje-button">Hoje</StyledLink>
            <StyledLink to="/historico">Histórico</StyledLink>
        </MenuContainer>
    );
}

const MenuContainer = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
`;

const StyledLink = styled(Link)`
    font-size: 18px;
    color: #52B6FF;
    text-decoration: none;

    &.hoje-button {
        width: 91px;
        height: 91px;
        background-color: #52B6FF;
        color: #FFFFFF;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        font-size: 18px;
    }
`;