// src/views/common/VerifyPasswordView.jsx
import { useState } from 'react';
import { FiSearch, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { compromisedPasswords } from '../../data/fakeData';

// --- MODIFICACIÓN 2: Eliminamos los props del layout ---
const VerifyPasswordView = () => {
    const [passwordToCheck, setPasswordToCheck] = useState('');
    const [checkResult, setCheckResult] = useState(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCheckPassword = () => {
        if (!passwordToCheck) {
            alert('Por favor ingresa una contraseña');
            return;
        }

        setIsChecking(true);

        // Simular verificación con un pequeño delay
        setTimeout(() => {
            const isCompromised = compromisedPasswords.includes(passwordToCheck);

            setCheckResult({
                status: isCompromised ? 'danger' : 'safe',
                message: isCompromised
                    ? 'Esta contraseña ha sido encontrada en filtraciones de datos conocidas'
                    : 'Esta contraseña no aparece en bases de datos de filtraciones conocidas',
                details: isCompromised
                    ? 'Te recomendamos cambiarla inmediatamente y usar el generador de contraseñas robustas.'
                    : 'Sin embargo, asegúrate de que tenga al menos 12 caracteres y combine letras, números y símbolos.'
            });
            setIsChecking(false);
        }, 1000);
    };

    // --- MODIFICACIÓN 3: Eliminamos el <DashboardLayout> ---
    return (
        <div className="p-6">
            {/* Header (Mantenemos el header de la vista, no el Topbar) */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Verificación de Contaseñas Filtradas
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Comprueba si tu contraseña ha sido expuesta en alguna filtración de datos
                </p>
            </div>

            {/* Main Card */}
            <div className="max-w-3xl mx-auto">
                <div className="bg-light-surface dark:bg-dark-surface p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-brand/10 dark:bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiShield className="w-8 h-8 text-brand" />
                    </div>

                    {/* Input Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary mb-3">
                            Ingresa la contraseña a verificar
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="password"
                                value={passwordToCheck}
                                onChange={(e) => setPasswordToCheck(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCheckPassword()}
                                placeholder="Tu contraseña aquí..."
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                            />
                            <button
                                onClick={handleCheckPassword}
                                disabled={isChecking}
                                className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <FiSearch className="w-5 h-5" />
                                {isChecking ? 'Verificando...' : 'Verificar'}
                            </button>
                        </div>
                    </div>

                    {/* Result */}
                    {checkResult && (
                        <div className={`p-6 rounded-lg border-2 ${
                            checkResult.status === 'danger'
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                        }`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    checkResult.status === 'danger'
                                        ? 'bg-red-100 dark:bg-red-900/40'
                                        : 'bg-green-100 dark:bg-green-900/40'
                                }`}>
                                    {checkResult.status === 'danger' ? (
                                        <FiAlertTriangle className="w-6 h-6 text-alert-red" />
                                    ) : (
                                        <FiCheckCircle className="w-6 h-6 text-alert-green" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-semibold mb-2 ${
                                        checkResult.status === 'danger'
                                            ? 'text-alert-red'
                                            : 'text-alert-green'
                                    }`}>
                                        {checkResult.status === 'danger' ? '⚠️ Contraseña Comprometida' : '✅ Contraseña Segura'}
                                    </h3>
                                    <p className="text-light-text dark:text-dark-text mb-2">
                                        {checkResult.message}
                                    </p>
                                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                        {checkResult.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                            ℹ️ ¿Cómo funciona?
                        </h4>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Comparamos tu contraseña con millones de credenciales filtradas en brechas de seguridad conocidas.
                            Tu contraseña nunca es almacenada y la verificación es completamente segura.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        // --- MODIFICACIÓN 3: Fin de la eliminación del <DashboardLayout> ---
    );
};

export default VerifyPasswordView;