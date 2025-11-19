// src/views/creator/AccountModal.jsx - NUEVO ARCHIVO
import { useState } from 'react';
import {
    FiX,
    FiEye,
    FiEyeOff,
    FiCopy,
    FiCheck,
    FiRefreshCw,
    FiSearch,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';
import { compromisedPasswords } from '../../data/fakeData';

const AccountModal = ({ account, onClose, onUpdatePassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const Icon = account.icon;

    const handleCopyPassword = async () => {
        try {
            await navigator.clipboard.writeText(account.password);
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

    const handleVerifyPassword = () => {
        setIsVerifying(true);

        setTimeout(() => {
            const isCompromised = compromisedPasswords.includes(account.password);

            setVerificationResult({
                status: isCompromised ? 'danger' : 'safe',
                message: isCompromised
                    ? '⚠️ Esta contraseña ha sido encontrada en filtraciones'
                    : '✅ Esta contraseña no aparece en bases de datos comprometidas',
                color: isCompromised ? 'red' : 'green'
            });
            setIsVerifying(false);
        }, 800);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-dark-surface rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                <Icon className="w-7 h-7 text-brand" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                                    {account.platform}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Detalles de la cuenta
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <FiX className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Usuario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Nombre de Usuario
                        </label>
                        <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                            {account.username}
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Email Asociado
                        </label>
                        <p className="text-lg font-semibold text-light-text dark:text-dark-text">
                            {account.email}
                        </p>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={account.password}
                                readOnly
                                className="w-full px-4 py-3 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-light-text dark:text-dark-text font-mono text-base"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button
                                    onClick={handleCopyPassword}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title="Copiar contraseña"
                                >
                                    {copiedPassword ? (
                                        <FiCheck className="w-5 h-5 text-alert-green" />
                                    ) : (
                                        <FiCopy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title={showPassword ? "Ocultar" : "Mostrar"}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    ) : (
                                        <FiEye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            onClick={handleVerifyPassword}
                            disabled={isVerifying}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium disabled:opacity-50"
                        >
                            <FiSearch className="w-5 h-5" />
                            {isVerifying ? 'Verificando...' : 'Verificar Contraseña'}
                        </button>
                        <button
                            onClick={() => onUpdatePassword(account.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            <FiRefreshCw className="w-5 h-5" />
                            Generar Nueva
                        </button>
                    </div>

                    {/* Resultado de Verificación */}
                    {verificationResult && (
                        <div className={`p-4 rounded-lg border-2 ${
                            verificationResult.color === 'red'
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                        }`}>
                            <p className={`font-medium ${
                                verificationResult.color === 'red' ? 'text-alert-red' : 'text-alert-green'
                            }`}>
                                {verificationResult.message}
                            </p>
                        </div>
                    )}

                    {/* Security Checks */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-base font-semibold text-light-text dark:text-dark-text mb-4">
                            Verificaciones de Seguridad
                        </h4>
                        <ul className="space-y-3">
                            {account.securityChecks.map((check) => (
                                <li key={check.name} className="flex items-center gap-3">
                                    {check.enabled ? (
                                        <FiCheckCircle className="w-5 h-5 text-alert-green flex-shrink-0" />
                                    ) : (
                                        <FiXCircle className="w-5 h-5 text-alert-red flex-shrink-0" />
                                    )}
                                    <span className="text-sm text-light-text dark:text-dark-text">
                                        {check.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-gray-700 p-6">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;