// src/components/layout/DashboardLayout.jsx}
import Sidebar from './Sidebar';
import Topbar from './Topbar';
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
    return (
        <div className="flex h-screen overflow-hidden bg-light-background dark:bg-dark-background">
            <Sidebar
                handleLogout={handleLogout}
                userRole={userRole}
                currentView={currentView}
                onNavigate={onNavigate}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar
                    viewTitle={viewTitle}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                    handleLogout={handleLogout}
                    onViewAllNotificationsClick={onViewAllNotificationsClick}
                />

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};
export default DashboardLayout;