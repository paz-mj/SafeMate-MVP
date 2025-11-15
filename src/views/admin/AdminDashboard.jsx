// src/views/admin/AdminDashboard.jsx - REFACTORIZADO
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import NotificationsModal from '../../views/common/NotificationsModal';
import ChatbotView from '../common/ChatbotView';

// Importar la vista principal (la que ya tenías)
import AdminAccountsView from './AdminAccountsView'; // Crearemos este archivo

const AdminDashboard = ({ handleLogout, isDark, toggleDarkMode }) => {
    // Estado para navegación interna
    const [currentView, setCurrentView] = useState('admin_accounts');
    const [showAllNotifications, setShowAllNotifications] = useState(false);

    // Función para renderizar la vista actual
    const renderView = () => {
        switch (currentView) {
            case 'admin_accounts':
                return <AdminAccountsView />;
            case 'chatbot':
                return <ChatbotView userRole="admin" />;
            default:
                return <AdminAccountsView />;
        }
    };

    // Función para obtener el título de la vista
    const getViewTitle = () => {
        switch (currentView) {
            case 'admin_accounts':
                return 'Gestión de Cuentas';
            case 'chatbot':
                return 'Asistente Chatbot';
            default:
                return 'Gestión de Cuentas';
        }
    };

    return (
        <>
            <DashboardLayout
                viewTitle={getViewTitle()}
                handleLogout={handleLogout}
                isDark={isDark}
                toggleDarkMode={toggleDarkMode}
                userRole="admin"
                currentView={currentView}
                onNavigate={setCurrentView}
                onViewAllNotificationsClick={() => setShowAllNotifications(true)}
            >
                {renderView()}
            </DashboardLayout>

            {/* Modal de Notificaciones */}
            {showAllNotifications && (
                <NotificationsModal onClose={() => setShowAllNotifications(false)} />
            )}
        </>
    );
};

export default AdminDashboard;