// src/components/layout/Sidebar.jsx
import { FiShield, FiUsers, FiMessageSquare, FiLogOut, FiHome } from 'react-icons/fi';

const Sidebar = ({ handleLogout, userRole = 'admin', currentView, onNavigate }) => {
    // Configuración de navegación según el rol
    const navigationConfig = {
        admin: [
            { name: 'Gestión de Cuentas', icon: FiUsers, view: 'admin_accounts' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        empleado: [
            { name: 'Mi Dashboard', icon: FiShield, view: 'empleado_dashboard' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        creator: [
            { name: 'Accounts', icon: FiHome, view: 'accounts' },
            { name: 'Security', icon: FiShield, view: 'security' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ]
    };

    const navItems = navigationConfig[userRole] || navigationConfig.admin;
    const defaultView = navItems[0].view;

    return (
        <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col flex-shrink-0">
            {/* Logo y Marca */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <FiShield className="w-8 h-8 text-brand" />
                    <div>
                        <h1 className="text-xl font-bold">SafeMate</h1>
                        <p className="text-xs text-gray-400 capitalize">
                            {userRole}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = (currentView || defaultView) === item.view;

                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => onNavigate(item.view)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-brand text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;