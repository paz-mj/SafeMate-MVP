// src/views/creator/CreatorDashboard.jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import NotificationsModal from '../common/NotificationsModal'; // ⭐ AGREGADO
import { fakeCreatorAccounts } from '../../data/fakeCreatorData';
import VerifyPasswordView from '../common/VerifyPasswordView';
import ChatbotView from '../common/ChatbotView';
import {
    FiCheckCircle,
    FiAlertTriangle,
    FiXCircle,
    FiChevronDown
} from 'react-icons/fi';

// --- Sub-componente: El Grid de Cuentas ---
const AccountsGrid = ({ onAccountClick }) => {
    const getStatusDisplay = (status, color) => {
        let Icon;
        let textColor = color === 'green' ? 'text-alert-green' : color === 'yellow' ? 'text-alert-yellow' : 'text-alert-red';
        if (color === 'green') Icon = FiCheckCircle;
        else if (color === 'yellow') Icon = FiAlertTriangle;
        else Icon = FiXCircle;
        return (
            <div className={`flex items-center gap-1.5 ${textColor}`}>
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{status}</span>
            </div>
        );
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Pinned Accounts
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Monitor and manage your connected social media accounts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fakeCreatorAccounts.map((account) => {
                    const Icon = account.icon;
                    return (
                        <div
                            key={account.id}
                            className="bg-light-surface dark:bg-dark-surface p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                        <Icon className="w-6 h-6 text-brand" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                            {account.platform}
                                        </h3>
                                        {getStatusDisplay(account.status, account.color)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => onAccountClick(account)}
                                    className="text-light-textSecondary dark:text-dark-textSecondary"
                                >
                                    <FiChevronDown className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Sub-componente: El Modal (Pop-up) ---
const AccountModal = ({ account, onClose }) => {
    const AccountIcon = account.icon;

    const renderStandardView = () => (
        <>
            <h3 className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Nombre de Usuario</h3>
            <p className="mb-4 text-light-text dark:text-dark-text">{account.username}</p>

            <h3 className="text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Email Asociado</h3>
            <p className="mb-6 text-light-text dark:text-dark-text">{account.email}</p>

            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">Verificaciones de Seguridad</h3>
            <ul className="space-y-3">
                {account.securityChecks.map((check) => (
                    <li key={check.name} className="flex items-center gap-3">
                        {check.enabled
                            ? <FiCheckCircle className="w-5 h-5 text-alert-green" />
                            : <FiXCircle className="w-5 h-5 text-alert-red" />
                        }
                        <span className="text-light-text dark:text-dark-text">{check.name}</span>
                    </li>
                ))}
            </ul>
        </>
    );

    const renderGmailView = () => (
        <ul className="space-y-3">
            {account.associatedEmails.map((item) => (
                <li key={item.email} className="p-3 bg-light-background dark:bg-dark-background rounded-lg">
                    <p className="font-semibold text-light-text dark:text-dark-text">{item.email}</p>
                    <div className="flex items-center gap-3 mt-2 text-light-textSecondary dark:text-dark-textSecondary">
                        {item.platforms.length > 4 ? (
                            <span className="text-sm">Plataformas Múltiples</span>
                        ) : (
                            item.platforms.map((Icon, index) => {
                                const PlatformIcon = Icon;
                                return <PlatformIcon key={index} className="w-5 h-5" />;
                            })
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
            <div
                className="w-full max-w-lg p-6 bg-light-surface dark:bg-dark-surface rounded-lg shadow-xl m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <AccountIcon className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">{account.platform}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-light-textSecondary dark:text-dark-textSecondary hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl">
                        &times;
                    </button>
                </div>

                {account.platform === 'Gmail' ? renderGmailView() : renderStandardView()}
            </div>
        </div>
    );
};

// --- Componente Principal del Dashboard del Creador ---
const CreatorDashboard = (props) => {
    const [currentView, setCurrentView] = useState('accounts');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showAllNotifications, setShowAllNotifications] = useState(false); // ⭐ AGREGADO

    const renderView = () => {
        switch (currentView) {
            case 'accounts':
                return <AccountsGrid onAccountClick={setSelectedAccount} />;
            case 'security':
                return <VerifyPasswordView />;
            case 'chatbot':
                return <ChatbotView />;
            default:
                return <AccountsGrid onAccountClick={setSelectedAccount} />;
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'accounts':
                return 'Accounts';
            case 'security':
                return 'Security';
            case 'chatbot':
                return 'Asistente Chatbot';
            default:
                return 'Accounts';
        }
    };

    return (
        <>
            <DashboardLayout
                {...props}
                viewTitle={getViewTitle()} // ⭐ AGREGADO
                userRole="creator"
                currentView={currentView}
                onNavigate={setCurrentView}
                onViewAllNotificationsClick={() => setShowAllNotifications(true)} // ⭐ AGREGADO
            >
                {renderView()}

                {selectedAccount && (
                    <AccountModal
                        account={selectedAccount}
                        onClose={() => setSelectedAccount(null)}
                    />
                )}
            </DashboardLayout>

            {/* ⭐ Modal de Notificaciones - AGREGADO */}
            {showAllNotifications && (
                <NotificationsModal onClose={() => setShowAllNotifications(false)} />
            )}
        </>
    );
};

export default CreatorDashboard;