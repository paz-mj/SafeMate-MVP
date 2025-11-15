// src/views/admin/WhitelistView.jsx
import { useState } from 'react';
import { FiPlus, FiTrash2, FiShield, FiCheckCircle } from 'react-icons/fi';

// Este componente recibe el estado y la función para modificarlo desde el padre
const WhitelistView = ({ whitelist, setWhitelist }) => {
    const [newDomain, setNewDomain] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (newDomain && !whitelist.includes(newDomain)) {
            setWhitelist([...whitelist, newDomain]);
            setNewDomain('');
            // Muestra la notificación verde
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

    const handleDeleteDomain = (domainToDelete) => {
        setWhitelist(whitelist.filter(domain => domain !== domainToDelete));
    };

    return (
        <div className="p-6">
            {/* Notificación de Éxito (arriba a la derecha) */}
            {showSuccess && (
                <div className="fixed top-24 right-6 bg-alert-green text-white p-4 rounded-lg shadow-lg z-50 flex items-center gap-2">
                    <FiCheckCircle />
                    <span>Dominio añadido con éxito</span>
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Gestión de Lista Blanca (Whitelist)
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Dominios que tu organización considera seguros. Los logs de estos sitios se marcarán en verde.
                </p>
            </div>

            {/* Formulario para agregar */}
            <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
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

            {/* Lista de dominios */}
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
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
                            Acción
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {whitelist.map((domain) => (
                        <tr key={domain} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-light-text dark:text-dark-text">
                                {domain}
                            </td>
                            <td className="px-6 py-4">
                                    <span className="flex items-center gap-2 text-sm font-medium text-alert-green">
                                        <FiShield />
                                        Verificado
                                    </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDeleteDomain(domain)}
                                    title="Eliminar Dominio"
                                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WhitelistView;