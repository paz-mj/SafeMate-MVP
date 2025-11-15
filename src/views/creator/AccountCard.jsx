// src/views/creator/AccountCard.jsx
import { useState } from 'react';
import {
    FiChevronDown,
    FiChevronUp,
    FiEye,
    FiEyeOff,
    FiCopy,
    FiCheck,
    FiTrash2,
    FiCheckCircle,
    FiAlertTriangle,
    FiXCircle,
    FiSearch,
    FiRefreshCw
} from 'react-icons/fi';
import { compromisedPasswords } from '../../data/fakeData';

const AccountCard = ({ account, onUpdate, onDelete, isDeleteMode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const Icon = account.icon;

    // ✅ Copiar contraseña
    const handleCopyPassword = async () => {
        try {
            await navigator.clipboard.writeText(account.password);
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

    // ✅ Verificar si la contraseña está comprometida
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

    // ✅ Íconos de estado
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
        <div className="bg-light-surface dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300">
            {/* Header - Siempre visible */}
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
                            <Icon className="w-6 h-6 text-brand" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                {account.platform}
                            </h3>
                            {getStatusDisplay()}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Botón Eliminar (solo en modo delete) */}
                        {isDeleteMode && (
                            <button
                                onClick={() => onDelete(account.id)}
                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Eliminar cuenta"
                            >
                                <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </button>
                        )}

                        {/* Botón Expandir/Contraer */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            {isExpanded ? (
                                <FiChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <FiChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido expandible - ACCORDION */}
            <div className={`transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}>
                <div className="px-5 pb-5 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {/* Usuario */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Nombre de Usuario
                        </label>
                        <p className="text-light-text dark:text-dark-text font-medium">
                            {account.username}
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Email Asociado
                        </label>
                        <p className="text-light-text dark:text-dark-text font-medium">
                            {account.email}
                        </p>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={account.password}
                                readOnly
                                className="w-full px-4 py-3 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-light-text dark:text-dark-text font-mono"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button
                                    onClick={handleCopyPassword}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title="Copiar contraseña"
                                >
                                    {copiedPassword ? (
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                    ) : (
                                        <FiCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title={showPassword ? "Ocultar" : "Mostrar"}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    ) : (
                                        <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium disabled:opacity-50"
                        >
                            <FiSearch className="w-4 h-4" />
                            {isVerifying ? 'Verificando...' : 'Verificar Contraseña'}
                        </button>
                        <button
                            onClick={() => onUpdate(account.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            <FiRefreshCw className="w-4 h-4" />
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
                            <p className={`text-sm font-medium ${
                                verificationResult.color === 'red' ? 'text-alert-red' : 'text-alert-green'
                            }`}>
                                {verificationResult.message}
                            </p>
                        </div>
                    )}

                    {/* Security Checks */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-3">
                            Verificaciones de Seguridad
                        </h4>
                        <ul className="space-y-2">
                            {account.securityChecks.map((check) => (
                                <li key={check.name} className="flex items-center gap-3">
                                    {check.enabled ? (
                                        <FiCheckCircle className="w-4 h-4 text-alert-green flex-shrink-0" />
                                    ) : (
                                        <FiXCircle className="w-4 h-4 text-alert-red flex-shrink-0" />
                                    )}
                                    <span className="text-sm text-light-text dark:text-dark-text">
                                        {check.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountCard;