// src/App.jsx
import { useState, useEffect } from 'react';
import Login from './views/common/Login.jsx';
import AdminDashboard from './views/admin/AdminDashboard.jsx';
import EmpleadoDashboard from './views/empleado/EmpleadoDashboard.jsx';
import CreatorDashboard from './views/creator/CreatorDashboard.jsx';

function App() {
    const [userRole, setUserRole] = useState(null); // null | 'admin' | 'empleado' | 'creator'
    const [isDark, setIsDark] = useState(true); // true = dark mode por defecto

    // Aplicar clase dark/light al body
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

    // Función para hacer login
    const handleLogin = (role) => {
        setUserRole(role);
    };

    // Función para hacer logout
    const handleLogout = () => {
        setUserRole(null);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
    };

    // Si no hay usuario logueado, mostrar Login
    if (!userRole) {
        return <Login onLogin={handleLogin} />;
    }

    // Renderizar el Dashboard correspondiente según el rol
    return (
        <>
            {userRole === 'admin' && (
                <AdminDashboard
                    handleLogout={handleLogout}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                />
            )}
            {userRole === 'empleado' && (
                <EmpleadoDashboard
                    handleLogout={handleLogout}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                />
            )}
            {userRole === 'creator' && (
                <CreatorDashboard
                    handleLogout={handleLogout}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                />
            )}
        </>
    );
}

export default App;
