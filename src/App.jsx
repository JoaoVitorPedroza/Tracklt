import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Hoje from './pages/Hoje.jsx';
import MeusHabitos from './pages/MeusHabitos.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Historico from './pages/Historico.jsx';
function App() {
  return(
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/hoje" element={<Hoje />} />
    <Route path="/MeusHabitos" element={<MeusHabitos />} />
    <Route path="/historico" element={<Historico />} />
   </Routes>
    </BrowserRouter>
  )
}
export default App
