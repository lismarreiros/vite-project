import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Responsive from './components/adicionar/Responsive';
import Viagens from './components/viagens';
import DetViagem from './components/detalhes';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
//      <Route path="/" element={<Responsive/>} />
      <Route path="/viagens" element={<Viagens/>} />
      <Route path='/detalhes' element={<DetViagem/>} />
      </Routes>
    </BrowserRouter>
  );
};