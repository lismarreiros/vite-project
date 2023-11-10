import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Viagens from './components/viagens';
import DetViagem from './components/detalhes';
import Form from './components/adicionar/Form'
import NDespesaMobile from './components/detalhes/NDespesaMobile';
import { Entrar } from './components/auth/Entrar';
import { AuthProvider } from '../shared/contexts/';



export default function App() {
  return (
    <AuthProvider>
     
        <BrowserRouter> 
        <Entrar>
          <Routes>
          <Route path='/' element={<Form/>} />
          <Route path='/viagens' element={<Viagens/>} />
          <Route path='/detalhes' element={<DetViagem/>} />
          <Route path='/novadespesa' element={<NDespesaMobile/>} />
          </Routes>
          </Entrar>
        </BrowserRouter>
     
    </AuthProvider>
  );
}