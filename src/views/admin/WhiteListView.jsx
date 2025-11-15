// src/views/admin/WhitelistView.jsx - VERSIÓN COMPLETA CON VERIFICACIÓN
import { useState } from 'react';
import { FiPlus, FiTrash2, FiShield, FiCheckCircle, FiAlertTriangle, FiAlertCircle, FiSearch } from 'react-icons/fi';
import { fakeLogs } from '../../data/fakeData';

const WhitelistView = ({ whitelist, setWhitelist }) => {
    const [newDomain, setNewDomain] = useState('');
    const [notification, setNotification] = useState(null);

    // ✅ Función para mostrar notificación temporal
    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // ✅ Función para verificar seguridad del dominio
    const verifyDomainSecurity = (domain) => {
        // Buscar el dominio en los logs fake para simular análisis
        const logEntry = fakeLogs.find(log => log.site === domain);

        if (!logEntry) {
            // Si no está en los logs, considerarlo seguro por defecto
            return {
                status: 'safe',
                color: 'green',
                icon: '✅',
                message: `"${domain}" es un dominio seguro`
            };
        }

        // Analizar según el status del log
        switch (logEntry.status) {
            case 'red':
                return {
                    status: 'dangerous',
                    color: 'red',
                    icon: '🚨',
                    message: `"${domain}" es un dominio PELIGROSO`
                };
            case 'yellow':
                return {
                    status: 'warning',
                    color: 'yellow',
                    icon: '⚠️',
                    message: `"${domain}" tiene confianza parcial`
                };
            case 'green':
            default:
                return {
                    status: 'safe',
                    color: 'green',
                    icon: '✅',
                    message: `"${domain}" es un dominio seguro`
                };
        }
    };

    // ✅ Agregar dominio con validación
    const handleAddDomain = (e) => {
        e.preventDefault();

        if (!newDomain.trim()) {
            showNotification('red', 'Por favor ingresa un dominio válido');
            return;
        }

        if (whitelist.includes(newDomain)) {
            showNotification('yellow', 'Este dominio ya está en la whitelist');
            return;
        }

        setWhitelist([...whitelist, newDomain]);
        setNewDomain('');
        showNotification('green', `Dominio "${newDomain}" añadido con éxito`);
    };

    // ✅ Eliminar dominio
    const handleDeleteDomain = (domainToDelete) => {
        setWhitelist(whitelist.filter(domain => domain !== domainToDelete));
        showNotification('green', `Dominio "${domainToDelete}" eliminado`);
    };

    // ✅ Verificar seguridad de un dominio específico
    const handleVerifyDomain = (domain) => {
        const result = verifyDomainSecurity(domain);
        showNotification(result.color, result.message);
    };

    return (
        <div className="p-6">
            {/* Notificación flotante */}
            {notification && (
                <div className={`fixed top-24 right-6 p-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-fade-in ${
                    notification.type === 'green' ? 'bg-alert-green text-white' :
                        notification.type === 'yellow' ? 'bg-alert-yellow text-white' :
                            'bg-alert-red text-white'
                }`}>
                    {notification.type === 'green' && <FiCheckCircle className="w-5 h-5" />}
                    {notification.type === 'yellow' && <FiAlertTriangle className="w-5 h-5" />}
                    {notification.type === 'red' && <FiAlertCircle className="w-5 h-5" />}
                    <span className="font-medium">{notification.message}</span>
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Gestión de Lista Blanca (Whitelist)
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Dominios verificados y seguros para tu organización. Los logs de estos sitios se marcarán en verde automáticamente.
                </p>
            </div>

            {/* Formulario para agregar */}
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <FiPlus className="w-6 h-6 text-brand" />
                    <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                        Agregar Nuevo Dominio
                    </h2>
                </div>
                <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="ejemplo.com"
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors font-medium flex items-center justify-center gap-2"
                    >
                        <FiPlus className="w-5 h-5" />
                        Agregar Dominio
                    </button>
                </form>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
                <div className="flex items-start gap-3">
                    <FiShield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                            ℹ️ Verificación Automática
                        </h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            Los dominios en esta lista aparecerán marcados en <span className="font-semibold">verde (🛡️ Verificado)</span> en los logs de usuarios.
                            Usa el botón "Verificar Seguridad" para analizar cada dominio antes de agregarlo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Lista de dominios */}
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {whitelist.length === 0 ? (
                    <div className="p-12 text-center">
                        <FiShield className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No hay dominios en la whitelist
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Agrega dominios seguros para que sean marcados automáticamente en los logs
                        </p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Dominio Seguro
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {whitelist.map((domain) => (
                            <tr key={domain} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                            <FiShield className="w-5 h-5 text-alert-green" />
                                        </div>
                                        <span className="font-medium text-light-text dark:text-dark-text">
                                                {domain}
                                            </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                        <span className="flex items-center gap-2 text-sm font-medium text-alert-green">
                                            <FiCheckCircle className="w-4 h-4" />
                                            Verificado
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleVerifyDomain(domain)}
                                            title="Verificar Seguridad"
                                            className="px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2"
                                        >
                                            <FiSearch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                    Verificar
                                                </span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDomain(domain)}
                                            title="Eliminar Dominio"
                                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Estadísticas */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total de Dominios</p>
                    <p className="text-2xl font-bold text-light-text dark:text-dark-text">{whitelist.length}</p>
                </div>
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Dominios Verificados</p>
                    <p className="text-2xl font-bold text-alert-green">{whitelist.length}</p>
                </div>
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Última Actualización</p>
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                        {new Date().toLocaleDateString('es-CL')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhitelistView;