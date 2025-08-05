import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import logo from '../assets/logo-do-projeto.PNG';
import {
    ScreenContainer,
    LogoImage,
    Form,
    StyledLink
} from '../style/LoginStyle.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        const body = {
            email,
            password
        };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate("/MeusHabitos");
            })
            .catch(err => {
                alert(`Erro no login: ${err.response.data.message}`);
                setLoading(false);
            });
    }

    return (
        <ScreenContainer>
            <LogoImage src={logo} alt="TrackIt Logo" />
            <Form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? <PuffLoader color="#FFF" size={20} /> : "Entrar"}
                </button>
            </Form>
            <Link to="/cadastro">
                <StyledLink>Não tem uma conta? Cadastre-se</StyledLink>
            </Link>
        </ScreenContainer>
    );
}