import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Viagens from './components/viagens';
import DetViagem from './components/detalhes';
import Form from './components/adicionar/Form'
import NDespesaMobile from './components/detalhes/NDespesaMobile';
import { Entrar } from './components/auth/Entrar';
import Cadastrar from './components/auth/Cadastrar';
import { AuthProvider } from '../shared/contexts/';


export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>    
      <Route path='/entrar' element={<Entrar/>} />
      <Route path='/cadastrar' element={<Cadastrar/>} />
      <Route path='/' element={<Form/>} />
      <Route path="/viagens" element={<Viagens/>} />
      <Route path='/detalhes' element={<DetViagem/>} />
      <Route path='/novadespesa' element={<NDespesaMobile/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}