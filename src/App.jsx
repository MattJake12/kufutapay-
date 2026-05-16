import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

// Contexto Global
import { AppProvider, useApp } from './context/AppContext';
// Layouts
import AppLayout from './components/layout/AppLayout';
// Páginas - Auth & Onboarding
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';

// Páginas - Core App
import Home from './pages/Home';
import POS from './pages/POS';
import History from './pages/History';
import Services from './pages/Services';
import Transfer from './pages/Transfer';
import ProofCheck from './pages/ProofCheck';
import Receipt from './pages/Receipt';
import Settings from './pages/Settings';
import Growth from './pages/Growth';
import Notifications from './pages/Notifications';

// Componente para Proteger Rotas (Opcional na Demo, mas boa prática)
const ProtectedRoute = ({ children }) => {
  const { user } = useApp();
  // Na demo, permitimos navegar mesmo sem user para facilitar o teste,
  // mas num app real descomentaríamos a linha abaixo:
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Todas as rotas agora vivem dentro do AppLayout (DeviceFrame) */}
          <Route element={<AppLayout />}>
            
            {/* --- ROTAS PÚBLICAS --- */}
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* --- ROTAS PRIVADAS --- */}
            <Route path="/app" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              {/* Redireciona /app para /app/home */}
              <Route index element={<Navigate to="/app/home" replace />} />
              
              <Route path="home" element={<Home />} />
              <Route path="pos" element={<POS />} />
              <Route path="history" element={<History />} />
              <Route path="services" element={<Services />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="proof-check" element={<ProofCheck />} />
              <Route path="receipt" element={<Receipt />} />
              <Route path="settings" element={<Settings />} />
              <Route path="growth" element={<Growth />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

          </Route>

          {/* Fallback para 404 - Volta para o início */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;