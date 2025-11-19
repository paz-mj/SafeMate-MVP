// src/components/layout/Sidebar.jsx - ACTUALIZADO
import { FiShield, FiUsers, FiMessageSquare, FiLogOut, FiHome, FiList, FiLock } from 'react-icons/fi';

const Sidebar = ({ handleLogout, userRole = 'admin', currentView, onNavigate }) => {
    // ✅ CORRECCIÓN: Navegación actualizada para Creator (sin 'security')
    const navigationConfig = {
        admin: [
            { name: 'Gestión de Cuentas', icon: FiUsers, view: 'admin_accounts' },
            { name: 'Lista Blanca', icon: FiList, view: 'whitelist' },
            { name: 'Panel de Control', icon: FiHome, view: 'dashboard' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        empleado: [
            { name: 'Mi Dashboard', icon: FiShield, view: 'empleado_dashboard' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        creator: [
            { name: 'Cuentas', icon: FiHome, view: 'accounts' },
            { name: 'Protección de Marca', icon: FiShield, view: 'brand_protection' }, // ✅ NUEVO
            { name: 'Bóveda Segura', icon: FiLock, view: 'vault' }, // ✅ NUEVO
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ]
    };

    const navItems = navigationConfig[userRole] || navigationConfig.admin;
    const defaultView = navItems[0].view;

    return (
        <aside className="w-64 bg-slate-800 dark:bg-slate-950 border-r border-slate-800 dark:border-slate-800 text-white h-screen flex flex-col flex-shrink-0 transition-all duration-300">
            {/* Logo y Marca */}
            <div className="p-6 border-b border-white/10 dark:border-gray-800 flex items-center gap-4">
                <img
                    src="/SafeMateLogo.png"
                    alt="SafeMate"
                    className="w-16 h-16 rounded-full"
                />
                <h1 className="text-2xl font-bold text-white">SafeMate</h1>
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
                                            ? 'bg-white/20 dark:bg-brand text-white'
                                            : 'text-white/80 hover:bg-white/10 dark:hover:bg-gray-800 hover:text-white'
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
            <div className="p-4 border-t border-white/10 dark:border-gray-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 dark:hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;