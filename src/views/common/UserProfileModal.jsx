// src/views/common/UserProfileModal.jsx
import { useState } from 'react';
import { FiX, FiUser, FiMail, FiLock, FiShield, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { compromisedPasswords } from '../../data/fakeData';

const UserProfileModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: 'Admin Usuario',
        email: 'admin@empresa.cl',
        currentPassword: ''
    });

    const [passwordCheck, setPasswordCheck] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleVerifyPassword = () => {
        if (!formData.currentPassword) {
            alert('Por favor ingresa tu contraseña actual');
            return;
        }

        setIsChecking(true);

        setTimeout(() => {
            const isCompromised = compromisedPasswords.includes(formData.currentPassword);

            setPasswordCheck({
                status: isCompromised ? 'danger' : 'safe',
                message: isCompromised
                    ? '⚠️ Tu contraseña ha sido encontrada en filtraciones'
                    : '✅ Tu contraseña no aparece en bases de datos comprometidas',
                recommendation: isCompromised
                    ? 'Te recomendamos cambiarla inmediatamente'
                    : 'Tu contraseña es segura'
            });
            setIsChecking(false);
        }, 800);
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Cambios guardados exitosamente');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-dark-surface z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
                            <FiUser className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                Mi Cuenta
                            </h3>
                            <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                Gestiona tu información personal
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-6">
                    {/* Información Personal */}
                    <div>
                        <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                            <FiUser className="w-5 h-5 text-brand" />
                            Información Personal
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verificación de Seguridad */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                            <FiShield className="w-5 h-5 text-brand" />
                            Seguridad de la Cuenta
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Verificar Contraseña Actual
                                </label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={formData.currentPassword}
                                            onChange={(e) => {
                                                setFormData({ ...formData, currentPassword: e.target.value });
                                                setPasswordCheck(null);
                                            }}
                                            placeholder="Ingresa tu contraseña actual"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleVerifyPassword}
                                        disabled={isChecking || !formData.currentPassword}
                                        className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isChecking ? 'Verificando...' : 'Verificar'}
                                    </button>
                                </div>
                            </div>

                            {/* Resultado de Verificación */}
                            {passwordCheck && (
                                <div className={`p-4 rounded-lg border-2 ${
                                    passwordCheck.status === 'danger'
                                        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                                        : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                                }`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            passwordCheck.status === 'danger'
                                                ? 'bg-red-100 dark:bg-red-900/40'
                                                : 'bg-green-100 dark:bg-green-900/40'
                                        }`}>
                                            {passwordCheck.status === 'danger' ? (
                                                <FiAlertTriangle className="w-5 h-5 text-alert-red" />
                                            ) : (
                                                <FiCheck className="w-5 h-5 text-alert-green" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-semibold mb-1 ${
                                                passwordCheck.status === 'danger'
                                                    ? 'text-alert-red'
                                                    : 'text-alert-green'
                                            }`}>
                                                {passwordCheck.message}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {passwordCheck.recommendation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Estado de Seguridad */}
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 flex items-center gap-2">
                                    <FiShield className="w-4 h-4" />
                                    Estado de Seguridad
                                </h5>
                                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                                    <li className="flex items-center gap-2">
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                        Verificación en dos pasos: Activa
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                        Alertas de seguridad: Habilitadas
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                        Último cambio de contraseña: Hace 2 meses
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Footer con Botones */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfileModal;