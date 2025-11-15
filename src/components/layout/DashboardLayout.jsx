// src/components/layout/DashboardLayout.jsx
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({
                             children,
                             viewTitle,
                             handleLogout,
                             isDark,
                             toggleDarkMode,
                             userRole = 'admin'
                         }) => {
    return (
        <div className="flex h-screen overflow-hidden bg-light-background dark:bg-dark-background">
            {/* Sidebar */}
            <Sidebar handleLogout={handleLogout} userRole={userRole} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <Topbar
                    viewTitle={viewTitle}
                    isDark={isDark}
                    toggleDarkMode={toggleDarkMode}
                    handleLogout={handleLogout}
                />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;