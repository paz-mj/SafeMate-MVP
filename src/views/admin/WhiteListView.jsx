// src/views/admin/WhiteListView.jsx
import { useState } from 'react';
import { FiPlus, FiTrash2, FiShield, FiCheckCircle, FiRefreshCw, FiGlobe } from 'react-icons/fi';

import Toast from '../common/Toast.jsx';

// --- ID DE TU EXTENSIÓN (Reemplázalo con el tuyo) ---
const EXTENSION_ID = "bnaojoacebkcmnjpggjhgjncmcianlie";

const WhitelistView = ({ whitelist, setWhitelist }) => {
    const [newDomain, setNewDomain] = useState('');
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        const toastType = { green: 'success', yellow: 'warning', red: 'danger' }[type] || 'info';
        setNotification({ type: toastType, message });
    };

    // --- FUNCIÓN DE SINCRONIZACIÓN ---
    const syncWithExtension = (newList) => {
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
            try {
                window.chrome.runtime.sendMessage(
                    EXTENSION_ID,
                    { action: "SYNC_WHITELIST", data: newList },
                    (response) => {
                        if (window.chrome.runtime.lastError) {
                            console.warn("⚠️ Error sync:", window.chrome.runtime.lastError);
                        } else if (response && response.success) {
                            console.log("✅ Extensión actualizada");
                        }
                    }
                );
            } catch (error) {
                console.error("Error enviando mensaje:", error);
            }
        }
    };

    // --- NUEVA LÓGICA DE LIMPIEZA DE DOMINIOS ---
    const cleanUrl = (input) => {
        try {
            // 1. Si el usuario no puso http, lo agregamos temporalmente para que URL() funcione
            const urlToParse = input.startsWith('http') ? input : `https://${input}`;
            const urlObj = new URL(urlToParse);

            // 2. Extraemos SOLO el hostname (ej: www.bbc.com)
            let hostname = urlObj.hostname;

            // 3. (Opcional) Quitamos 'www.' para hacer la lista más limpia
            // hostname = hostname.replace(/^www\./, '');

            return hostname.toLowerCase();
        } catch (e) {
            // Fallback si es texto plano inválido
            return input.trim().toLowerCase();
        }
    };

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (!newDomain.trim()) { showNotification('red', 'Ingresa un dominio válido'); return; }

        // LIMPIEZA INTELIGENTE
        // Ahora: "https://bbc.com/news/world" se convierte en -> "bbc.com"
        const cleanDomain = cleanUrl(newDomain);

        if (whitelist.includes(cleanDomain)) {
            showNotification('yellow', `"${cleanDomain}" ya está en la lista`);
            return;
        }

        const updatedList = [...whitelist, cleanDomain];
        setWhitelist(updatedList);
        setNewDomain('');

        syncWithExtension(updatedList);
        showNotification('green', `Dominio "${cleanDomain}" añadido correctamente`);
    };

    const handleDeleteDomain = (domain) => {
        const updatedList = whitelist.filter(d => d !== domain);
        setWhitelist(updatedList);
        syncWithExtension(updatedList);
        showNotification('green', 'Dominio eliminado');
    };

    const handleManualSync = () => {
        syncWithExtension(whitelist);
        showNotification('green', 'Sincronización forzada enviada');
    }

    return (
        <div className="p-4 md:p-6">
            <Toast notification={notification} onClose={() => setNotification(null)} />

            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">Gestión de Dominios</h1>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                        Agrega enlaces completos, el sistema extraerá el dominio automáticamente.
                    </p>
                </div>
                <button onClick={handleManualSync} className="text-gray-400 hover:text-brand p-2" title="Forzar Sync">
                    <FiRefreshCw />
                </button>
            </div>

            <div className="bg-light-surface dark:bg-dark-surface p-4 md:p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <FiGlobe className="w-6 h-6 text-brand" />
                    <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">Agregar Nuevo Sitio</h2>
                </div>
                <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="Ej: https://www.bbc.com/news/world-683..."
                        className="flex-1 px-4 py-2 border rounded-lg bg-light-background dark:bg-dark-background dark:border-gray-600 text-light-text dark:text-dark-text"
                    />
                    <button type="submit" className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover flex justify-center items-center gap-2 w-full sm:w-auto">
                        <FiPlus /> Agregar
                    </button>
                </form>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6 flex gap-3">
                <FiShield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Sincronización Activa</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        SafeMate reconocerá estos dominios como seguros inmediatamente.
                    </p>
                </div>
            </div>

            {/* LISTA DE DOMINIOS */}
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {whitelist.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No hay dominios en la whitelist.</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Dominio Limpio</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Acción</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {whitelist.map(domain => (
                            <tr key={domain} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-alert-green">
                                        <FiShield />
                                    </div>
                                    <span className="font-medium text-light-text dark:text-dark-text">{domain}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        <FiCheckCircle /> Seguro
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDeleteDomain(domain)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded transition-colors" title="Eliminar">
                                        <FiTrash2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default WhitelistView;