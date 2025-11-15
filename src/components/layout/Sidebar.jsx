// src/components/layout/Sidebar.jsx
import { FiShield, FiUsers, FiMessageSquare, FiLogOut, FiSearch, FiHome, FiCheckSquare } from 'react-icons/fi';

// Recibimos 'currentView' y 'onNavigate' desde el Dashboard padre
const Sidebar = ({ handleLogout, userRole = 'admin', currentView, onNavigate }) => {

    // Configuración de navegación corregida
    const navigationConfig = {
        admin: [
            { name: 'Gestión de Cuentas', icon: FiUsers, view: 'admin_accounts' },
            { name: 'Verificar Contraseña', icon: FiSearch, view: 'verify' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        empleado: [
            { name: 'Mi Dashboard', icon: FiShield, view: 'empleado_dashboard' },
            { name: 'Comprobación de Seguridad', icon: FiCheckSquare, view: 'verify' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ],
        creator: [
            // ESTA ES LA NAVEGACIÓN CORREGIDA PARA EL CREADOR
            { name: 'Accounts', icon: FiHome, view: 'accounts' },
            { name: 'Security', icon: FiSearch, view: 'security' },
            { name: 'Asistente Chatbot', icon: FiMessageSquare, view: 'chatbot' }
        ]
    };

    const navItems = navigationConfig[userRole] || navigationConfig.admin;
    const defaultView = navItems[0].view; // Vista por defecto si 'currentView' no se pasa

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
                        // Comprueba si este item es el activo
                        const isActive = (currentView || defaultView) === item.view;

                        return (
                            <li key={item.name}>
                                <button
                                    onClick={() => onNavigate(item.view)} // Llama a la función del padre
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-brand text-white' // Activo
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white' // Inactivo
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