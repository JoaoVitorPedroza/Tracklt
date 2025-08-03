import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PuffLoader } from 'react-spinners';
import dayjs from 'dayjs';

import Header from '../components/Header.jsx';
import Menu from '../components/Menu.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Historico() {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config)
                .then(res => {
                    setHistory(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    alert(`Erro ao carregar histórico: ${err.response.data.message}`);
                    setLoading(false);
                });
        }
    }, [user]);

    function getTileClassName({ date, view }) {
        if (view === 'month' && history) {
            const dateStr = dayjs(date).format('DD/MM/YYYY');
            const dayData = history.find(day => day.day === dateStr);

            if (dayData) {
                const allDone = dayData.habits.every(habit => habit.done);
                return allDone ? 'all-done' : 'some-done';
            }
        }
    }

    if (loading) {
        return <LoadingScreen><PuffLoader color="#52B6FF" size={50} /></LoadingScreen>;
    }

    return (
        <ScreenContainer>
            <Header />
            <ContentContainer>
                <h1>Histórico</h1>
                <Calendar
                    locale="pt-br"
                    tileClassName={getTileClassName}
                />
            </ContentContainer>
            <Menu />
        </ScreenContainer>
    );
}

const ScreenContainer = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    padding: 98px 18px 110px 18px;
    
    .react-calendar {
        width: 100%;
        max-width: 350px;
        border: none;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
        font-family: 'Lexend Deca', sans-serif;
    }
    .react-calendar__tile {
        height: 40px;
        text-align: center;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .react-calendar__tile--now {
        background: #F2F2F2;
    }
    .react-calendar__tile--active {
        background: none;
        color: black;
    }
    .all-done {
        background-color: #8FC549 !important;
        color: white;
    }
    .some-done {
        background-color: #EA5766 !important;
        color: white;
    }
    .react-calendar__navigation button {
        color: #126BA5;
    }
`;

const ContentContainer = styled.div`
    h1 {
        font-size: 23px;
        color: #126BA5;
        margin-bottom: 28px;
    }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;