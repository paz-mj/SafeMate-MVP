// src/components/layout/Topbar.jsx
import { useState, useRef, useEffect } from 'react';
import { LuSun, LuMoon, LuBell, LuUser, LuSettings, LuLogOut } from 'react-icons/lu';
import { fakeNotifications } from '../../data/fakeData';
import UserProfileModal from '../../views/common/UserProfileModal';

const Topbar = ({ viewTitle, isDark, toggleDarkMode, handleLogout, onViewAllNotificationsClick }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const notifRef = useRef(null);
    const userMenuRef = useRef(null);

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleViewAllClick = () => {
        setShowNotifications(false);
        onViewAllNotificationsClick();
    };

    const handleOpenProfile = () => {
        setShowUserMenu(false);
        setShowProfileModal(true);
    };

    return (
        <>
            <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-800 px-6 py-4 transition-colors duration-300">
                <div className="flex items-center justify-between">
                    {/* Título de la Vista */}
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {viewTitle}
                    </h2>

                    {/* Acciones de Usuario */}
                    <div className="flex items-center gap-4">
                        {/* Toggle Dark Mode */}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle dark mode"
                        >
                            {isDark ? (
                                <LuSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <LuMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {/* Notificaciones */}
                        <div className="relative" ref={notifRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                                aria-label="Notifications"
                            >
                                <LuBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Dropdown de Notificaciones */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {fakeNotifications.slice(0, 3).map((notif) => (
                                            <div
                                                key={notif.id}
                                                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                                        notif.type === 'danger' ? 'bg-alert-red' :
                                                            notif.type === 'warning' ? 'bg-alert-yellow' :
                                                                'bg-brand'
                                                    }`}></div>
                                                    <div className="flex-1">
                                                        <p className="text-sm text-gray-900 dark:text-white">{notif.message}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                                        <button
                                            onClick={handleViewAllClick}
                                            className="text-sm text-brand hover:text-brand/80 font-medium"
                                        >
                                            Ver todas las notificaciones
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Menú de Usuario */}
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                aria-label="User profile"
                            >
                                <LuUser className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>

                            {/* Dropdown de Usuario */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                        <p className="font-semibold text-gray-900 dark:text-white">Admin Usuario</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">admin@empresa.cl</p>
                                    </div>
                                    <div className="py-2">
                                        <button
                                            onClick={handleOpenProfile}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <LuSettings className="w-4 h-4" />
                                            <span>Mi Cuenta</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <LuLogOut className="w-4 h-4" />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal de Perfil de Usuario */}
            {showProfileModal && (
                <UserProfileModal onClose={() => setShowProfileModal(false)} />
            )}
        </>
    );
};

export default Topbar;