import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { PuffLoader } from 'react-spinners'; // Agora está correto!

export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleCadastro(e) {
        e.preventDefault();
        setLoading(true);

        const body = { email, password, name, image };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
            .then(res => {
                setLoading(false);
                alert("Cadastro realizado com sucesso! Redirecionando para o login.");
                navigate("/");
            })
            .catch(err => {
                setLoading(false);
                alert(`Erro no cadastro: ${err.response.data.message}`);
            });
    }

    return (
        <Container>
            {/* Aqui vai o componente de logo */}
            <form onSubmit={handleCadastro}>
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
                <input
                    type="text"
                    placeholder="nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="url"
                    placeholder="foto"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                     {loading ? (
                     <PuffLoader color="#FFF" size={20} />
                        ) : (
                    "Cadastrar"
                    )}
                </button>
            </form>
            <StyledLink to="/">
                Já tem uma conta? Faça login!
            </StyledLink>
        </Container>
    );
}

const Container = styled.div`
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