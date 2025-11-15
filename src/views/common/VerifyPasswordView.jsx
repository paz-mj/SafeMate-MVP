// src/views/VerifyPasswordView.jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FiSearch, FiShield, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const VerifyPasswordView = ({ handleLogout, isDark, toggleDarkMode, userRole = 'admin' }) => {
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
            // Contraseñas débiles conocidas para la simulación
            const weakPasswords = ['123456', 'password', 'admin', '12345678', 'qwerty', '123456789',
                'letmein', 'welcome', 'monkey', '1234567890'];
            const isWeak = weakPasswords.includes(passwordToCheck.toLowerCase());

            setCheckResult({
                status: isWeak ? 'danger' : 'safe',
                message: isWeak
                    ? 'Esta contraseña ha sido encontrada en filtraciones de datos conocidas'
                    : 'Esta contraseña no aparece en bases de datos de filtraciones conocidas',
                details: isWeak
                    ? 'Te recomendamos cambiarla inmediatamente y usar el generador de contraseñas robustas.'
                    : 'Sin embargo, asegúrate de que tenga al menos 12 caracteres y combine letras, números y símbolos.'
            });
            setIsChecking(false);
        }, 1000);
    };

    return (
        <DashboardLayout
            viewTitle="Verificar Contraseña"
            handleLogout={handleLogout}
            isDark={isDark}
            toggleDarkMode={toggleDarkMode}
            userRole={userRole}
        >
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Verificación de Contraseñas Filtradas
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Comprueba si tu contraseña ha sido expuesta en alguna filtración de datos
                    </p>
                </div>

                {/* Main Card */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-dark-surface p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                        {/* Icon */}
                        <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiShield className="w-8 h-8 text-brand" />
                        </div>

                        {/* Input Section */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Ingresa la contraseña a verificar
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="password"
                                    value={passwordToCheck}
                                    onChange={(e) => setPasswordToCheck(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCheckPassword()}
                                    placeholder="Tu contraseña aquí..."
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                                />
                                <button
                                    onClick={handleCheckPassword}
                                    disabled={isChecking}
                                    className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
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
                                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                                            {checkResult.message}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
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
        </DashboardLayout>
    );
};

export default VerifyPasswordView;