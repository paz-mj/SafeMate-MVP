// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Importamos el Router
import Login from './views/common/Login.jsx';
import AdminDashboard from './views/admin/AdminDashboard.jsx';
import EmpleadoDashboard from './views/empleado/EmpleadoDashboard.jsx';
import CreatorDashboard from './views/creator/CreatorDashboard.jsx';
import LandingBeta from './views/LandingBeta.jsx'; // Importamos la Landing

// Componente que contiene tu lógica original de la App
const MainApp = () => {
    const [userRole, setUserRole] = useState(null);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const body = document.body;
        if (isDark) {
            body.classList.add('dark');
            body.classList.remove('light');
        } else {
            body.classList.add('light');
            body.classList.remove('dark');
        }
    }, [isDark]);

    const handleLogin = (role) => setUserRole(role);
    const handleLogout = () => setUserRole(null);
    const toggleDarkMode = () => setIsDark(prev => !prev);

    if (!userRole) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <>
            {userRole === 'admin' && (
                <AdminDashboard handleLogout={handleLogout} isDark={isDark} toggleDarkMode={toggleDarkMode} />
            )}
            {userRole === 'empleado' && (
                <EmpleadoDashboard handleLogout={handleLogout} isDark={isDark} toggleDarkMode={toggleDarkMode} />
            )}
            {userRole === 'creator' && (
                <CreatorDashboard handleLogout={handleLogout} isDark={isDark} toggleDarkMode={toggleDarkMode} />
            )}
        </>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Ruta para la Landing Page (lo que escanearán en el QR) */}
                <Route path="/beta" element={<LandingBeta />} />

                {/* Ruta Principal (tu App normal) */}
                <Route path="/" element={<MainApp />} />

                {/* Cualquier otra ruta redirige al inicio */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
