import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Viagens from './components/viagens';
import DetViagem from './components/detalhes';
import Form from './components/adicionar/Form'
import NDespesaMobile from './components/detalhes/NDespesaMobile';
import { Entrar } from './components/auth/Entrar';
import { AuthProvider } from '../shared/contexts/';
import Cadastrar from './components/auth/Cadastrar';


const PrivateRoutes = () => (
  <Routes> 
    <Route path="/" element={<Form />} />
    <Route path="/viagens" element={<Viagens />} />
    <Route path="/:id/despesas" element={<DetViagem />} />
    <Route path="/:id/despesas/novadespesa" element={<NDespesaMobile />} />
  </Routes>
);

export default function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
      <Routes>
       <Route
        path="/*"
        element={
        // Renderizar Entrar apenas quando não estiver autenticado
         <Entrar>
          {/* Rotas privadas (requerem autenticação) */}
            <PrivateRoutes />
         </Entrar>
        }/>
        
        {/* Rota pública (fora de Entrar) */}
          <Route path="/signup/" element={<Cadastrar />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}