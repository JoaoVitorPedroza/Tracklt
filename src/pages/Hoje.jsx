import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

import Header from '../components/Header.jsx';
import Menu from '../components/Menu.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Hoje() {
    const { user } = useContext(AuthContext);
    const [todayHabits, setTodayHabits] = useState(null);
    const [loading, setLoading] = useState(true);

    dayjs.locale('pt-br');
    const today = dayjs().format('dddd, DD/MM');

    function getTodayHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            .then(res => {
                setTodayHabits(res.data);
                setLoading(false);
            })
            .catch(err => {
                alert(`Erro ao carregar hábitos de hoje: ${err.response.data.message}`);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (user) {
            getTodayHabits();
        }
    }, [user]);

    function handleCheck(habitId, isDone) {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };

        const url = isDone
            ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`
            : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`;

        axios.post(url, null, config)
            .then(res => {
                getTodayHabits();
            })
            .catch(err => {
                alert(`Erro ao marcar/desmarcar hábito: ${err.response.data.message}`);
            });
    }

    if (loading) {
        return <LoadingScreen><PuffLoader color="#52B6FF" size={50} /></LoadingScreen>;
    }

    return (
        <ScreenContainer>
            <Header />
            <ContentContainer>
                <TitleContainer>
                    <h1>{today}</h1>
                    <p>Nenhum hábito concluído ainda</p>
                </TitleContainer>

                <HabitsList>
                    {todayHabits && todayHabits.map(habit => (
                        <HabitItem key={habit.id} $isDone={habit.done}>
                            <div>
                                <h2>{habit.name}</h2>
                                <p>Sequência atual: <span isHighlighted={habit.currentSequence > 0 && habit.currentSequence === habit.highestSequence}>{habit.currentSequence} dias</span></p>
                                <p>Seu recorde: <span isHighlighted={habit.highestSequence > 0 && habit.currentSequence === habit.highestSequence}>{habit.highestSequence} dias</span></p>
                            </div>
                            <CheckButton $isDone={habit.done} onClick={() => handleCheck(habit.id, habit.done)}>
                                <ion-icon name="checkmark-sharp"></ion-icon>
                            </CheckButton>
                        </HabitItem>
                    ))}
                </HabitsList>
            </ContentContainer>
            <Menu />
        </ScreenContainer>
    );
}

// Estilização
const ScreenContainer = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    padding: 98px 18px 110px 18px;
`;

const ContentContainer = styled.div`
    // Estilos do conteúdo principal
`;

const TitleContainer = styled.div`
    margin-bottom: 28px;
    
    h1 {
        font-size: 23px;
        color: #126BA5;
    }

    p {
        font-size: 18px;
        color: #BABABA;
    }
`;

const HabitsList = styled.div`
    // Estilos da lista de hábitos
`;

const HabitItem = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 13px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 7px;
    }

    p {
        font-size: 13px;
        color: #666666;
    }
`;

const CheckButton = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${props => props.$isDone ? '#8FC549' : '#EBEBEB'};
    border: 1px solid ${props => props.$isDone ? '#8FC549' : '#E7E7E7'};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ion-icon {
        color: #FFFFFF;
        font-size: 35px;
    }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;