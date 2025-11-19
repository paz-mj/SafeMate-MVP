// src/views/creator/CreatorDashboard.jsx - VERSIÓN CORREGIDA
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
import VerifyPasswordView from '../common/VerifyPasswordView';
import Toast from '../common/Toast';

const AccountsView = ({
                          accounts,
                          onUpdatePassword,
                          onDeleteAccount,
                          isDeleteMode,
                          onToggleDeleteMode,
                          onCreateAccount,
                          expandedCards,
                          onToggleCard
                      }) => {
    return (
        <div className="p-6">
            <div className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-4 md:gap-2">
                    <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                        Cuentas Conectadas
                    </h1>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={onToggleDeleteMode}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium w-full sm:w-auto ${
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
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium w-full sm:w-auto"
                        >
                            <FiPlus className="w-5 h-5" />
                            Agregar Red Social
                        </button>
                    </div>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Supervisa y gestiona tus cuentas de redes sociales conectadas.
                </p>
            </div>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onUpdate={onUpdatePassword}
                            onDelete={onDeleteAccount}
                            isDeleteMode={isDeleteMode}
                            isExpanded={expandedCards.includes(account.id)}
                            onToggleExpand={onToggleCard}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const CreatorDashboard = (props) => {
    const [currentView, setCurrentView] = useState('accounts');
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const [accounts, setAccounts] = useState(fakeCreatorAccounts);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [notification, setNotification] = useState(null);

    // ✅ CORRECCIÓN: Estado para manejar tarjetas expandidas individualmente
    const [expandedCards, setExpandedCards] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [accountToDelete, setAccountToDelete] = useState(null);

    // ✅ CORRECCIÓN: Función para toggle individual de tarjetas
    const handleToggleCard = (accountId) => {
        setExpandedCards(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };

    const handleCreateAccount = (newAccount) => {
        setAccounts([...accounts, newAccount]);
        setShowCreateModal(false);
        setNotification({
            type: 'success',
            message: `Cuenta "${newAccount.platform}" agregada con éxito`
        });
    };

    const handleDeleteAccount = (accountId) => {
        const account = accounts.find(a => a.id === accountId);
        setAccountToDelete(account);
    };

    const confirmDelete = () => {
        setAccounts(accounts.filter(a => a.id !== accountToDelete.id));
        // También remover de tarjetas expandidas
        setExpandedCards(prev => prev.filter(id => id !== accountToDelete.id));
        setNotification({
            type: 'success',
            message: `Cuenta "${accountToDelete.platform}" eliminada`
        });
        setAccountToDelete(null);
        setIsDeleteMode(false);
    };

    const handleUpdatePassword = (accountId) => {
        setSelectedAccountId(accountId);
        setShowPasswordGenerator(true);
    };

    const handlePasswordGenerated = (newPassword) => {
        const account = accounts.find(a => a.id === selectedAccountId);
        setAccounts(accounts.map(acc =>
            acc.id === selectedAccountId
                ? { ...acc, password: newPassword }
                : acc
        ));
        setNotification({
            type: 'success',
            message: `Contraseña de "${account.platform}" actualizada`
        });
        setShowPasswordGenerator(false);
        setSelectedAccountId(null);
    };

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
                        expandedCards={expandedCards}
                        onToggleCard={handleToggleCard}
                    />
                );
            case 'security':
                return <VerifyPasswordView />;
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
                        expandedCards={expandedCards}
                        onToggleCard={handleToggleCard}
                    />
                );
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'accounts':
                return 'Cuentas';
            case 'security':
                return 'Seguridad';
            case 'chatbot':
                return 'Asistente Chatbot';
            default:
                return 'Cuentas';
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

            <Toast notification={notification} onClose={() => setNotification(null)} />

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