// src/views/creator/CreatorDashboard.jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fakeCreatorAccounts } from '../../data/fakeCreatorData'; // Nuestros datos
// Importa tus vistas comunes
import VerifyPasswordView from '../common/VerifyPasswordView';
import ChatbotView from '../common/ChatbotView';
// Iconos
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
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Pinned Accounts
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Monitor and manage your connected social media accounts.
                </p>
            </div>

            {/* Grid de Cuentas (como en el mockup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fakeCreatorAccounts.map((account) => {
                    const Icon = account.icon; // <--- Esto SÍ está bien (se usa en la línea 69)
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
                                    onClick={() => onAccountClick(account)} // Abre el modal
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

    // --- CORRECCIÓN 1 (Línea 152): Aliasear el ícono a una variable PascalCase ---
    const AccountIcon = account.icon;

    // Renderiza el modal estándar
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

    // --- CORRECCIÓN 2 (Línea 113): Objeto 'platformIcons' eliminado (no se usaba) ---
    // (Objeto eliminado)

    // Renderiza la vista especial de Gmail
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
                                // Asumo que 'Icon' es el componente FiMail, FiInstagram, etc.
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
                onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal lo cierre
            >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        {/* --- CORRECCIÓN 3 (Línea 152): Usar la variable PascalCase --- */}
                        <AccountIcon className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">{account.platform}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-light-textSecondary dark:text-dark-textSecondary hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl">
                        &times;
                    </button>
                </div>

                {/* Renderizado condicional del contenido del modal */}
                {account.platform === 'Gmail' ? renderGmailView() : renderStandardView()}

            </div>
        </div>
    );
};


// --- Componente Principal del Dashboard del Creador ---
const CreatorDashboard = (props) => {
    // Estado para la navegación interna (Accounts, Security, Chatbot)
    const [currentView, setCurrentView] = useState('accounts');

    // Estado para el modal (pop-up)
    const [selectedAccount, setSelectedAccount] = useState(null);

    const renderView = () => {
        switch (currentView) {
            case 'accounts':
                return <AccountsGrid onAccountClick={setSelectedAccount} />;
            case 'security':
                // Asegúrate de que la ruta de importación sea correcta
                return <VerifyPasswordView />;
            case 'chatbot':
                // Asegúrate de que la ruta de importación sea correcta
                return <ChatbotView />;
            default:
                return <AccountsGrid onAccountClick={setSelectedAccount} />;
        }
    };

    return (
        // Pasamos el estado de la vista y el handler al Layout/Sidebar
        <DashboardLayout
            {...props}
            userRole="creator"
            currentView={currentView}
            onNavigate={setCurrentView}
        >
            {/* Renderiza la vista activa */}
            {renderView()}

            {/* Renderiza el modal si hay una cuenta seleccionada */}
            {selectedAccount && (
                <AccountModal
                    account={selectedAccount}
                    onClose={() => setSelectedAccount(null)}
                />
            )}
        </DashboardLayout>
    );
};

export default CreatorDashboard;