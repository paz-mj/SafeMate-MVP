// src/components/common/NotificationsModal.jsx
import { FiX, FiAlertTriangle, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { fakeNotifications } from '../../data/fakeData';

const NotificationsModal = ({ onClose }) => {
    const getNotificationIcon = (type) => {
        switch(type) {
            case 'danger':
                return <FiAlertTriangle className="w-5 h-5 text-alert-red" />;
            case 'warning':
                return <FiAlertCircle className="w-5 h-5 text-alert-yellow" />;
            default:
                return <FiInfo className="w-5 h-5 text-brand" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Todas las Notificaciones
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Notificaciones List */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                        {fakeNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {getNotificationIcon(notif.type)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900 dark:text-white font-medium mb-1">
                                            {notif.message}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {notif.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Notificaciones adicionales simuladas */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-4">
                                <FiInfo className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium mb-1">
                                        Sistema actualizado correctamente
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Hace 3 horas
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-4">
                                <FiAlertCircle className="w-5 h-5 text-alert-yellow flex-shrink-0 mt-1" />
                                <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium mb-1">
                                        Recordatorio: Revisar políticas de seguridad
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Hace 5 horas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;