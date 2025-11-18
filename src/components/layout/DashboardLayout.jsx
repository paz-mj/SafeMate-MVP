// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

const DashboardLayout = ({
                             children,
                             viewTitle,
                             handleLogout,
                             isDark,
                             toggleDarkMode,
                             userRole = 'admin',
                             currentView,
                             onNavigate,
                             onViewAllNotificationsClick
                         }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleNavigate = (view) => {
        onNavigate(view);
        setSidebarOpen(false); // Cierra el menú al hacer clic en un enlace
    };

    return (

        <div className="flex h-screen bg-light-background dark:bg-dark-background">


            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}


            <div className={`
                fixed inset-y-0 left-0 z-30 w-64
                transform transition-transform duration-300 ease-in-out
                lg:static lg:translate-x-0 lg:flex-shrink-0 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar
                    handleLogout={handleLogout}
                    userRole={userRole}
                    currentView={currentView}
                    onNavigate={handleNavigate}
                />
            </div>


            <div className="flex-1 flex flex-col">
                <Topbar
                    viewTitle={viewTitle}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                    handleLogout={handleLogout}
                    onViewAllNotificationsClick={onViewAllNotificationsClick}
                    onMenuClick={() => setSidebarOpen(true)}
                />


                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;