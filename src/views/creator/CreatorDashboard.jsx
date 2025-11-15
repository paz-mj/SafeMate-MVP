// src/views/creator/CreatorDashboard.jsx - REFACTORIZADO COMPLETO
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import NotificationsModal from '../common/NotificationsModal';
import ChatbotView from '../common/ChatbotView';
import PasswordGeneratorModal from '../../components/PasswordGeneratorModal';
import AccountCard from './AccountCard';
import CreateAccountModal from './CreateAccountModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { fakeCreatorAccounts } from '../../data/fakeCreatorData';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

// --- Vista de Cuentas (Accounts) ---
const AccountsView = ({
                          accounts,
                          onUpdatePassword,
                          onDeleteAccount,
                          isDeleteMode,
                          onToggleDeleteMode,
                          onCreateAccount
                      }) => {
    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                        Pinned Accounts
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleDeleteMode}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                                isDeleteMode
                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                            <FiTrash2 className="w-5 h-5" />
                            {isDeleteMode ? 'Cancelar' : 'Eliminar Cuentas'}
                        </button>
                        <button
                            onClick={onCreateAccount}
                            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            <FiPlus className="w-5 h-5" />
                            Agregar Red Social
                        </button>
                    </div>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Monitor and manage your connected social media accounts.
                </p>
            </div>

            {/* Mensaje cuando no hay cuentas */}
            {accounts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPlus className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                        No hay cuentas agregadas
                    </h3>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                        Comienza agregando tu primera red social
                    </p>
                    <button
                        onClick={onCreateAccount}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                    >
                        <FiPlus className="w-5 h-5" />
                        Agregar Primera Cuenta
                    </button>
                </div>
            ) : (
                /* Grid de Cuentas */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onUpdate={onUpdatePassword}
                            onDelete={onDeleteAccount}
                            isDeleteMode={isDeleteMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Componente Principal ---
const CreatorDashboard = (props) => {
    // Estados principales
    const [currentView, setCurrentView] = useState('accounts');
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const [accounts, setAccounts] = useState(fakeCreatorAccounts);
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    // Estados de modales
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);

    // ✅ Crear nueva cuenta
    const handleCreateAccount = (newAccount) => {
        setAccounts([...accounts, newAccount]);
        setShowCreateModal(false);
    };

    // ✅ Eliminar cuenta
    const handleDeleteAccount = (accountId) => {
        const account = accounts.find(a => a.id === accountId);
        setAccountToDelete(account);
    };

    const confirmDelete = () => {
        setAccounts(accounts.filter(a => a.id !== accountToDelete.id));
        setAccountToDelete(null);
        setIsDeleteMode(false);
    };

    // ✅ Actualizar contraseña
    const handleUpdatePassword = (accountId) => {
        setSelectedAccountId(accountId);
        setShowPasswordGenerator(true);
    };

    const handlePasswordGenerated = (newPassword) => {
        setAccounts(accounts.map(account =>
            account.id === selectedAccountId
                ? { ...account, password: newPassword }
                : account
        ));
        setShowPasswordGenerator(false);
        setSelectedAccountId(null);
    };

    // ✅ Renderizar vista actual
    const renderView = () => {
        switch (currentView) {
            case 'accounts':
                return (
                    <AccountsView
                        accounts={accounts}
                        onUpdatePassword={handleUpdatePassword}
                        onDeleteAccount={handleDeleteAccount}
                        isDeleteMode={isDeleteMode}
                        onToggleDeleteMode={() => setIsDeleteMode(!isDeleteMode)}
                        onCreateAccount={() => setShowCreateModal(true)}
                    />
                );
            case 'security':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                            Security Settings (Próximamente)
                        </h2>
                    </div>
                );
            case 'chatbot':
                return <ChatbotView />;
            default:
                return (
                    <AccountsView
                        accounts={accounts}
                        onUpdatePassword={handleUpdatePassword}
                        onDeleteAccount={handleDeleteAccount}
                        isDeleteMode={isDeleteMode}
                        onToggleDeleteMode={() => setIsDeleteMode(!isDeleteMode)}
                        onCreateAccount={() => setShowCreateModal(true)}
                    />
                );
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
                viewTitle={getViewTitle()}
                userRole="creator"
                currentView={currentView}
                onNavigate={setCurrentView}
                onViewAllNotificationsClick={() => setShowAllNotifications(true)}
            >
                {renderView()}
            </DashboardLayout>

            {/* Modales */}
            {showAllNotifications && (
                <NotificationsModal onClose={() => setShowAllNotifications(false)} />
            )}

            {showCreateModal && (
                <CreateAccountModal
                    onClose={() => setShowCreateModal(false)}
                    onCreateAccount={handleCreateAccount}
                    existingPlatforms={accounts.map(a => a.platform)}
                />
            )}

            {showPasswordGenerator && (
                <PasswordGeneratorModal
                    onClose={() => {
                        setShowPasswordGenerator(false);
                        setSelectedAccountId(null);
                    }}
                    onPasswordGenerated={handlePasswordGenerated}
                />
            )}

            {accountToDelete && (
                <DeleteConfirmModal
                    account={accountToDelete}
                    onConfirm={confirmDelete}
                    onCancel={() => setAccountToDelete(null)}
                />
            )}
        </>
    );
};

export default CreatorDashboard;