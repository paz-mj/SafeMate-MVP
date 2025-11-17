// src/components/common/Toast.jsx
import { useEffect } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ notification, onClose }) => {
    // Cierra automáticamente después de 3 segundos
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification, onClose]);

    if (!notification) return null;

    const styles = {
        success: 'bg-emerald-500 text-white',
        warning: 'bg-amber-500 text-white',
        danger: 'bg-rose-600 text-white',
        info: 'bg-blue-500 text-white',
    };

    const icons = {
        success: <FiCheckCircle className="w-5 h-5" />,
        warning: <FiAlertTriangle className="w-5 h-5" />,
        danger: <FiAlertCircle className="w-5 h-5" />,
        info: <FiInfo className="w-5 h-5" />,
    };

    // Mapeo para soportar tipos antiguos si es necesario
    const typeMap = {
        green: 'success',
        red: 'danger',
        yellow: 'warning',
        blue: 'info',
        success: 'success',
        danger: 'danger',
        warning: 'warning',
        info: 'info'
    };

    const activeType = typeMap[notification.type] || 'info';

    return (
        <div className={`fixed top-6 right-6 p-4 rounded-lg shadow-lg z-[9999] flex items-center gap-3 animate-fade-in transition-all transform duration-300 ${styles[activeType]}`}>
            {icons[activeType]}
            <span className="font-medium">{notification.message}</span>
        </div>
    );
};

export default Toast;