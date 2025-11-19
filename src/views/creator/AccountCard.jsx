// src/views/creator/AccountCard.jsx - VERSIÓN COMPACTA SIN ACORDEÓN
import { FiEye, FiTrash2, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

const AccountCard = ({ account, onViewDetails, onDelete, isDeleteMode }) => {
    const Icon = account.icon;

    const getStatusDisplay = () => {
        const statusConfig = {
            green: { Icon: FiCheckCircle, text: 'Secure', color: 'text-alert-green' },
            yellow: { Icon: FiAlertTriangle, text: 'Warning', color: 'text-alert-yellow' },
            red: { Icon: FiXCircle, text: 'Critical', color: 'text-alert-red' }
        };

        const { Icon: StatusIcon, text, color } = statusConfig[account.color] || statusConfig.green;

        return (
            <div className={`flex items-center gap-1.5 ${color}`}>
                <StatusIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{text}</span>
            </div>
        );
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
            {/* Header */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg flex-shrink-0">
                            <Icon className="w-6 h-6 text-brand" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text truncate">
                                {account.platform}
                            </h3>
                            {getStatusDisplay()}
                        </div>
                    </div>

                    {isDeleteMode && (
                        <button
                            onClick={() => onDelete(account.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                            title="Eliminar cuenta"
                        >
                            <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </button>
                    )}
                </div>

                {/* Info Básica */}
                <div className="space-y-2 mb-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Usuario</p>
                        <p className="text-sm font-medium text-light-text dark:text-dark-text truncate">
                            {account.username}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm font-medium text-light-text dark:text-dark-text truncate">
                            {account.email}
                        </p>
                    </div>
                </div>

                {/* Botón Ver Detalles */}
                <button
                    onClick={() => onViewDetails(account)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                >
                    <FiEye className="w-4 h-4" />
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};

export default AccountCard;