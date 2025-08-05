import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Header() {
    const { user } = useContext(AuthContext);

    return (
        <HeaderContainer>
            <h1>TrackIt</h1>
            <img src={user?.image} alt="Foto de perfil" />
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    z-index: 100;

    h1 {
        font-family: 'Playball', cursive; // Assumindo uma fonte de logo
        font-size: 39px;
        color: #FFFFFF;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;