import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Menu from '../components/Menu.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { PuffLoader } from 'react-spinners';

export default function MeusHabitos() {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddHabitForm, setShowAddHabitForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [newHabitName, setNewHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);

   // ... (código anterior)

function getHabits() {
    // Certifica-se de que o token é usado para a requisição
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };

    axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        .then(res => {
            setHabits(res.data);
            setLoading(false);
        })
        .catch(err => {
            alert(`Erro ao carregar hábitos: ${err.response.data.message}`);
            setLoading(false);
        });
}

useEffect(() => {
    // A função getHabits() só é chamada se houver um usuário logado
    if (user) {
        getHabits();
    }
}, [user]);

// ... (código posterior)
    useEffect(() => {
    if (user) {
        getHabits();
    }
    }, [user]);

    function handleDaySelection(dayIndex) {
        if (selectedDays.includes(dayIndex)) {
            setSelectedDays(selectedDays.filter(day => day !== dayIndex));
        } else {
            setSelectedDays([...selectedDays, dayIndex]);
        }
    }
function handleCreateHabit(e) {
    e.preventDefault();

    // Adiciona a verificação para garantir que pelo menos um dia foi selecionado
    if (selectedDays.length === 0) {
        alert("Por favor, selecione pelo menos um dia da semana para o seu hábito.");
        return; // Interrompe a execução da função
    }

    setFormLoading(true);

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    };
    const body = {
        name: newHabitName,
        days: selectedDays
    };

    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        .then(res => {
            setFormLoading(false);
            setNewHabitName('');
            setSelectedDays([]);
            setShowAddHabitForm(false);
            getHabits();
        })
        .catch(err => {
            setFormLoading(false);
            alert(`Erro ao criar hábito: ${err.response.data.message}`);
        });
}

    function handleDeleteHabit(habitId) {
        if (window.confirm("Você realmente quer deletar este hábito?")) {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`, config)
                .then(res => {
                    getHabits();
                })
                .catch(err => {
                    alert(`Erro ao deletar hábito: ${err.response.data.message}`);
                });
        }
    }

    if (loading) {
        return <LoadingScreen><PuffLoader color="#52B6FF" size={50} /></LoadingScreen>;
    }

    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    return (
        <ScreenContainer>
            <Header />
            <ContentContainer>
                <TitleContainer>
                    <h1>Meus hábitos</h1>
                    <AddButton onClick={() => setShowAddHabitForm(!showAddHabitForm)}>+</AddButton>
                </TitleContainer>

                {showAddHabitForm && (
                    <AddHabitForm onSubmit={handleCreateHabit}>
                        <input
                            type="text"
                            placeholder="nome do hábito"
                            value={newHabitName}
                            onChange={e => setNewHabitName(e.target.value)}
                            disabled={formLoading}
                        />
                        <DayButtonsContainer>
                            {weekdays.map((day, index) => (
                                <DayButton
                                    key={index}
                                    type="button"
                                    $isSelected={selectedDays.includes(index)}
                                    onClick={() => handleDaySelection(index)}
                                    disabled={formLoading}
                                >
                                    {day}
                                </DayButton>
                            ))}
                        </DayButtonsContainer>
                        <ButtonsContainer>
                            <CancelButton
                                type="button"
                                onClick={() => setShowAddHabitForm(false)}
                                disabled={formLoading}
                            >
                                Cancelar
                            </CancelButton>
                            <SaveButton type="submit" disabled={formLoading}>
                                {formLoading ? (
                                    <PuffLoader color="#FFF" size={20} />
                                ) : (
                                    "Salvar"
                                )}
                            </SaveButton>
                        </ButtonsContainer>
                    </AddHabitForm>
                )}

                {habits.length === 0 ? (
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um para começar a trackear!</p>
                ) : (
                    <HabitsList>
                        {habits.map(habit => (
                            <HabitItem key={habit.id}>
                                <div>
                                    <h2>{habit.name}</h2>
                                    <DayButtonsContainer>
                                        {weekdays.map((day, index) => (
                                            <DayButton key={index} $isSelected={habit.days.includes(index)}>
                                                {day}
                                            </DayButton>
                                        ))}
                                    </DayButtonsContainer>
                                </div>
                                <TrashButton onClick={() => handleDeleteHabit(habit.id)}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </TrashButton>
                            </HabitItem>
                        ))}
                    </HabitsList>
                )}
            </ContentContainer>
            <Menu />
        </ScreenContainer>
    );
}

const ScreenContainer = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    padding: 98px 18px 110px 18px;
`;

const ContentContainer = styled.div`
    // Estilos do conteúdo principal
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h1 {
        font-size: 23px;
        color: #126BA5;
    }
`;

const AddButton = styled.button`
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    font-size: 27px;
    line-height: 1;
    cursor: pointer;
`;

const AddHabitForm = styled.form`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    input {
        height: 45px;
        padding: 0 11px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        margin-bottom: 8px;
        &::placeholder {
            color: #DBDBDB;
        }
    }
`;

const DayButtonsContainer = styled.div`
    display: flex;
    gap: 4px;
`;

const DayButton = styled.button`
    width: 30px;
    height: 30px;
    background-color: ${props => props.$isSelected ? '#CFCFCF' : '#FFFFFF'};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    color: ${props => props.$isSelected ? '#FFFFFF' : '#DBDBDB'};
    font-size: 20px;
    cursor: pointer;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 29px;
`;

const CancelButton = styled.button`
    background: none;
    border: none;
    color: #52B6FF;
    font-size: 16px;
    margin-right: 23px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background-color: #52B6FF;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HabitsList = styled.div`
    // Estilos da lista de hábitos
`;

const HabitItem = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 13px;
    margin-bottom: 10px;
    position: relative;
    
    h2 {
        font-size: 20px;
        color: #666666;
        margin-bottom: 7px;
    }
`;

const TrashButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    color: #666666;
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;