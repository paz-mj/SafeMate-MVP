// src/views/admin/WhiteListView.jsx
import { useState } from 'react';
import { FiPlus, FiTrash2, FiShield, FiCheckCircle, FiSearch } from 'react-icons/fi';
import { fakeLogs } from '../../data/fakeData.js';
import Toast from '../common/Toast.jsx';

const WhitelistView = ({ whitelist, setWhitelist }) => {
    const [newDomain, setNewDomain] = useState('');
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        const toastType = { green: 'success', yellow: 'warning', red: 'danger' }[type] || 'info';
        setNotification({ type: toastType, message });
    };

    const verifyDomainSecurity = (domain) => {
        const logEntry = fakeLogs.find(log => log.site === domain);
        if (!logEntry) return { status: 'safe', color: 'green', icon: '✅', message: `"${domain}" es seguro` };
        switch (logEntry.status) {
            case 'red': return { status: 'dangerous', color: 'red', icon: '🚨', message: `"${domain}" es PELIGROSO` };
            case 'yellow': return { status: 'warning', color: 'yellow', icon: '⚠️', message: `"${domain}" tiene confianza parcial` };
            default: return { status: 'safe', color: 'green', icon: '✅', message: `"${domain}" es seguro` };
        }
    };

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (!newDomain.trim()) { showNotification('red', 'Ingresa un dominio válido'); return; }
        if (whitelist.includes(newDomain)) { showNotification('yellow', 'Ya está en la whitelist'); return; }
        setWhitelist([...whitelist, newDomain]);
        setNewDomain('');
        showNotification('green', `Dominio "${newDomain}" añadido`);
    };

    const handleDeleteDomain = (domain) => {
        setWhitelist(whitelist.filter(d => d !== domain));
        showNotification('green', `Dominio "${domain}" eliminado`);
    };

    const handleVerifyDomain = (domain) => {
        const result = verifyDomainSecurity(domain);
        showNotification(result.color, result.message);
    };

    return (
        <div className="p-4 md:p-6">
            <Toast notification={notification} onClose={() => setNotification(null)} />

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">Gestión de Whitelist</h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">Dominios verificados y seguros para tu organización.</p>
            </div>

            <div className="bg-light-surface dark:bg-dark-surface p-4 md:p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center gap-3 mb-4"><FiPlus className="w-6 h-6 text-brand" /><h2 className="text-lg font-semibold text-light-text dark:text-dark-text">Agregar Nuevo Dominio</h2></div>
                <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-3">
                    <input type="text" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} placeholder="ejemplo.com" className="flex-1 px-4 py-2 border rounded-lg bg-light-background dark:bg-dark-background dark:border-gray-600 text-light-text dark:text-dark-text" />
                    <button type="submit" className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover flex justify-center items-center gap-2 w-full sm:w-auto"><FiPlus /> Agregar</button>
                </form>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6 flex gap-3">
                <FiShield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div><h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Verificación Automática</h3><p className="text-sm text-blue-800 dark:text-blue-300">Los dominios aquí aparecerán marcados en verde en los logs.</p></div>
            </div>

            {/* --- VISTA MÓVIL: LISTA (Visible solo en móvil) --- */}
            <div className="flex flex-col gap-3 md:hidden">
                {whitelist.length === 0 && <p className="text-center text-gray-500">No hay dominios.</p>}
                {whitelist.map(domain => (
                    <div key={domain} className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-alert-green"><FiShield /></div>
                            <span className="font-medium text-light-text dark:text-dark-text break-all">{domain}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                            <span className="flex items-center gap-1 text-xs font-medium text-alert-green"><FiCheckCircle /> Verificado</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleVerifyDomain(domain)} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><FiSearch /></button>
                                <button onClick={() => handleDeleteDomain(domain)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg"><FiTrash2 /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- VISTA ESCRITORIO: TABLA (Visible solo en desktop) --- */}
            <div className="hidden md:block bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {whitelist.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No hay dominios en la whitelist.</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Dominio</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Estado</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Acciones</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {whitelist.map(domain => (
                            <tr key={domain} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 flex items-center gap-3"><div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center text-alert-green"><FiShield /></div><span className="font-medium text-light-text dark:text-dark-text">{domain}</span></td>
                                <td className="px-6 py-4"><span className="flex items-center gap-2 text-sm font-medium text-alert-green"><FiCheckCircle /> Verificado</span></td>
                                <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => handleVerifyDomain(domain)} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded flex items-center gap-1 text-sm"><FiSearch /> Verificar</button><button onClick={() => handleDeleteDomain(domain)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded"><FiTrash2 /></button></div></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-600 dark:text-gray-400">Total Dominios</p><p className="text-2xl font-bold text-light-text dark:text-dark-text">{whitelist.length}</p></div>
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-600 dark:text-gray-400">Verificados</p><p className="text-2xl font-bold text-alert-green">{whitelist.length}</p></div>
                <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700"><p className="text-sm text-gray-600 dark:text-gray-400">Actualizado</p><p className="text-sm font-medium text-light-text dark:text-dark-text">{new Date().toLocaleDateString('es-CL')}</p></div>
            </div>
        </div>
    );
};

export default WhitelistView;