// frontend/src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// 💡 SOLUÇÃO: A importação DEVE SER EXATAMENTE ASSIM:
import RegisterPage from './pages/RegisterPage.tsx'; 

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
