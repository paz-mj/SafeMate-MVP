// src/views/empleado/EmpleadoDashboard.jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FiShield, FiActivity, FiAlertCircle, FiSearch, FiEye, FiEyeOff, FiCopy, FiCheck } from 'react-icons/fi';
import PasswordGeneratorModal from '../../components/PasswordGeneratorModal';

const EmpleadoDashboard = ({ handleLogout, isDark, toggleDarkMode }) => {
    const [passwordToCheck, setPasswordToCheck] = useState('');
    const [checkResult, setCheckResult] = useState(null);

    // Estado para "Mi Contraseña"
    const [myPassword, setMyPassword] = useState('MiP@ssw0rd2024!');
    const [showMyPassword, setShowMyPassword] = useState(false);
    const [copiedMyPassword, setCopiedMyPassword] = useState(false);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);

    const handleCheckPassword = () => {
        if (!passwordToCheck) {
            alert('Por favor ingresa una contraseña');
            return;
        }

        const weakPasswords = ['123456', 'password', 'admin', '12345678', 'qwerty'];
        const isWeak = weakPasswords.includes(passwordToCheck.toLowerCase());

        setCheckResult({
            status: isWeak ? 'danger' : 'safe',
            message: isWeak
                ? '⚠️ Esta contraseña ha sido encontrada en filtraciones de datos'
                : '✅ Esta contraseña no aparece en bases de datos conocidas'
        });
    };

    const handleCopyMyPassword = async () => { // 1. Añadimos 'async'
        try {
            await navigator.clipboard.writeText(myPassword); // 2. Esperamos a que la promesa termine
            setCopiedMyPassword(true); // 3. Esto solo se ejecuta si el 'await' tuvo éxito
            setTimeout(() => setCopiedMyPassword(false), 2000);
        } catch (err) {
            console.error('Error al copiar la contraseña: ', err);
            alert('Error al copiar. Por favor, copia manualmente.');
        }
    };

    const handlePasswordGenerated = (newPassword) => {
        setMyPassword(newPassword);
        alert('Tu contraseña ha sido actualizada exitosamente');
    };

    return (
        <DashboardLayout
            viewTitle="Dashboard Empleado"
            handleLogout={handleLogout}
            isDark={isDark}
            toggleDarkMode={toggleDarkMode}
            userRole="empleado"
        >
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Panel de Empleado
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Monitorea el estado de seguridad de tus credenciales
                    </p>
                </div>

                {/* Cards de Estado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <FiShield className="w-6 h-6 text-alert-green" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Estado General</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">Seguro</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Todas tus credenciales están protegidas
                        </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <FiActivity className="w-6 h-6 text-brand" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Sitios Visitados</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            En las últimas 24 horas
                        </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                                <FiAlertCircle className="w-6 h-6 text-alert-yellow" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Alertas</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sin alertas de seguridad
                        </p>
                    </div>
                </div>

                {/* Mi Contraseña */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        🔐 Mi Contraseña
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Gestiona tu contraseña de acceso a la plataforma
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Contraseña Actual
                            </label>
                            <div className="relative">
                                <input
                                    type={showMyPassword ? "text" : "password"}
                                    value={myPassword}
                                    readOnly
                                    className="w-full px-4 py-3 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    <button
                                        onClick={handleCopyMyPassword}
                                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        title="Copiar"
                                    >
                                        {copiedMyPassword ? (
                                            <FiCheck className="w-4 h-4 text-alert-green" />
                                        ) : (
                                            <FiCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowMyPassword(!showMyPassword)}
                                        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        title={showMyPassword ? "Ocultar" : "Mostrar"}
                                    >
                                        {showMyPassword ? (
                                            <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        ) : (
                                            <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPasswordGenerator(true)}
                            className="w-full px-4 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            Generar Nueva Contraseña
                        </button>
                    </div>
                </div>

                {/* Modal de Generador */}
                {showPasswordGenerator && (
                    <PasswordGeneratorModal
                        onClose={() => setShowPasswordGenerator(false)}
                        onPasswordGenerated={handlePasswordGenerated}
                    />
                )}

                {/* Herramienta de Comprobación de Contraseña */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FiSearch className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Verificar Contraseña Filtrada
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Verifica si tu contraseña ha sido expuesta en alguna filtración de datos conocida.
                    </p>

                    <div className="flex gap-3">
                        <input
                            type="password"
                            value={passwordToCheck}
                            onChange={(e) => setPasswordToCheck(e.target.value)}
                            placeholder="Ingresa la contraseña a verificar"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                        />
                        <button
                            onClick={handleCheckPassword}
                            className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                        >
                            Verificar
                        </button>
                    </div>

                    {checkResult && (
                        <div className={`mt-4 p-4 rounded-lg ${
                            checkResult.status === 'danger'
                                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        }`}>
                            <p className={`font-medium ${
                                checkResult.status === 'danger'
                                    ? 'text-alert-red'
                                    : 'text-alert-green'
                            }`}>
                                {checkResult.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Información Adicional */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        📊 Estadísticas de Seguridad
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Última verificación</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">Hace 2 horas</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Credenciales monitoreadas</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">8 cuentas</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmpleadoDashboard;