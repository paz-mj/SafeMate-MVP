// src/views/admin/AdminDashboard.jsx - CON PANEL DE CONTROL
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import NotificationsModal from '../common/NotificationsModal';
import ChatbotView from '../common/ChatbotView';
import AdminAccountsView from './AdminAccountsView';
import WhitelistView from './WhiteListView';
import DashboardPanelView from './ControlPanelView.jsx'; // ✅ NUEVO

const AdminDashboard = ({ handleLogout, isDark, toggleDarkMode }) => {
    // ✅ CORRECCIÓN: Vista por defecto cambiada a 'dashboard'
    const [currentView, setCurrentView] = useState('dashboard');
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const [whitelist, setWhitelist] = useState([
        'mail.google.com',
        'erp.empresa.cl',
        'drive.google.com'
    ]);

    // ✅ CORRECCIÓN: Incluye el nuevo Panel de Control
    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardPanelView />;
            case 'admin_accounts':
                return <AdminAccountsView whitelist={whitelist} />;
            case 'whitelist':
                return <WhitelistView whitelist={whitelist} setWhitelist={setWhitelist} />;
            case 'chatbot':
                return <ChatbotView userRole="admin" />;
            default:
                return <DashboardPanelView />;
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'dashboard':
                return 'Panel de Control';
            case 'admin_accounts':
                return 'Gestión de Cuentas';
            case 'whitelist':
                return 'Lista Blanca';
            case 'chatbot':
                return 'Asistente Chatbot';
            default:
                return 'Panel de Control';
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

            {showAllNotifications && (
                <NotificationsModal onClose={() => setShowAllNotifications(false)} />
            )}
        </>
    );
};

export default AdminDashboard;