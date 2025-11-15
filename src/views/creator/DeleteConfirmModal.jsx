// src/views/creator/DeleteConfirmModal.jsx
import { FiAlertTriangle } from 'react-icons/fi';

const DeleteConfirmModal = ({ account, onConfirm, onCancel }) => {
    const Icon = account.icon;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
            <div
                className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                        <FiAlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text text-center mb-2">
                        Eliminar Cuenta
                    </h3>

                    {/* Message */}
                    <div className="text-center mb-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                            ¿Estás seguro que quieres eliminar tu cuenta de
                        </p>
                        <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Icon className="w-5 h-5 text-brand" />
                            <span className="font-semibold text-light-text dark:text-dark-text">
                                {account.platform}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            Esta acción no se puede deshacer.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;