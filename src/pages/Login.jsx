import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { PuffLoader } from 'react-spinners'; // Importe o componente de loading
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
    const { setUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        const body = { email, password };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then(res => {
                setLoading(false);
                setUser(res.data); // Salva no contexto global
                localStorage.setItem('trackitUser', JSON.stringify(res.data)); // Salva no localStorage
                navigate("/hoje"); // Redireciona para a tela inicial
            })
            .catch(err => {
                setLoading(false);
                alert(`Erro no login: ${err.response.data.message}`);
            });
    }

    return (
        <Container>
            {/* Aqui vai o componente de logo */}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? (
                    <PuffLoader color="#FFF" size={20} />
                    ) : (
                 "Entrar"
                 )}
                </button>
            </form>
            <StyledLink to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </StyledLink>
        </Container>
    );
}

const Container = styled.div`
    // Estilos são os mesmos da tela de cadastro, o que é ótimo para reutilizar
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 36px;
    
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 32px;
        
        input {
            height: 45px;
            margin-bottom: 6px;
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
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const StyledLink = styled(Link)`
    margin-top: 25px;
    font-size: 14px;
    color: #52B6FF;
    text-decoration: none;
`;