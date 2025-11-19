// src/views/creator/SecureVaultView.jsx - NUEVO
import { useState } from 'react';
import {
    FiLock,
    FiEye,
    FiEyeOff,
    FiCopy,
    FiCheck,
    FiTrash2,
    FiPlus,
    FiX,
    FiCreditCard,
    FiFileText
} from 'react-icons/fi';
import { fakeVaultItems } from '../../data/fakeCreatorData';
import Toast from '../common/Toast';

const SecureVaultView = () => {
    const [vaultItems, setVaultItems] = useState(fakeVaultItems);
    const [visibleItems, setVisibleItems] = useState(new Set());
    const [copiedItems, setCopiedItems] = useState(new Set());
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [notification, setNotification] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'text',
        isSensitive: true,
        category: 'Personal'
    });

    const toggleVisibility = (itemId) => {
        setVisibleItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const handleCopy = async (content, itemId) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedItems(prev => new Set(prev).add(itemId));
            setTimeout(() => {
                setCopiedItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            }, 2000);
            setNotification({
                type: 'success',
                message: 'Contenido copiado al portapapeles'
            });
        } catch (err) {
            setNotification({
                type: 'danger',
                message: 'Error al copiar'
            });
        }
    };

    const handleDelete = (itemId) => {
        setVaultItems(vaultItems.filter(item => item.id !== itemId));
        setShowDeleteModal(null);
        setNotification({
            type: 'success',
            message: 'Elemento eliminado de la bóveda'
        });
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            ...formData,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setVaultItems([newItem, ...vaultItems]);
        setShowCreateModal(false);
        setFormData({
            title: '',
            content: '',
            type: 'text',
            isSensitive: true,
            category: 'Personal'
        });
        setNotification({
            type: 'success',
            message: 'Elemento agregado a la bóveda'
        });
    };

    const getTypeIcon = (type) => {
        return type === 'bank' ? FiCreditCard : FiFileText;
    };

    const maskContent = (content) => {
        return '•'.repeat(Math.min(content.length, 20));
    };

    return (
        <div className="p-4 md:p-6">
            <Toast notification={notification} onClose={() => setNotification(null)} />

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                        Bóveda Segura
                    </h1>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">
                        Almacena información sensible de forma encriptada
                    </p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium w-full md:w-auto"
                >
                    <FiPlus className="w-5 h-5" />
                    Agregar Elemento
                </button>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6 flex gap-3">
                <FiLock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                        Encriptación de Extremo a Extremo
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        Toda la información está encriptada y solo tú puedes acceder a ella
                    </p>
                </div>
            </div>

            {/* Grid de Items */}
            {vaultItems.length === 0 ? (
                <div className="text-center py-16 bg-light-surface dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiLock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                        Bóveda Vacía
                    </h3>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                        Agrega tu primer elemento seguro
                    </p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                    >
                        <FiPlus className="w-5 h-5" />
                        Agregar Primer Elemento
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vaultItems.map((item) => {
                        const TypeIcon = getTypeIcon(item.type);
                        const isVisible = visibleItems.has(item.id);
                        const isCopied = copiedItems.has(item.id);

                        return (
                            <div
                                key={item.id}
                                className="bg-light-surface dark:bg-dark-surface p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 bg-brand/10 dark:bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <TypeIcon className="w-5 h-5 text-brand" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-light-text dark:text-dark-text truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {item.category}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowDeleteModal(item.id)}
                                        className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <div className="relative">
                                        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-sm text-light-text dark:text-dark-text break-all">
                                            {item.isSensitive && !isVisible
                                                ? maskContent(item.content)
                                                : item.content}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {item.createdAt}
                                    </span>
                                    <div className="flex gap-1">
                                        {item.isSensitive && (
                                            <button
                                                onClick={() => toggleVisibility(item.id)}
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                title={isVisible ? 'Ocultar' : 'Mostrar'}
                                            >
                                                {isVisible ? (
                                                    <FiEyeOff className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                ) : (
                                                    <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                )}
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleCopy(item.content, item.id)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            title="Copiar"
                                        >
                                            {isCopied ? (
                                                <FiCheck className="w-4 h-4 text-alert-green" />
                                            ) : (
                                                <FiCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Crear */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
                    <div
                        className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">
                                Nuevo Elemento
                            </h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <FiX className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ej: Tarjeta de Crédito"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Contenido *
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Información a guardar"
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Tipo
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                    >
                                        <option value="text">Texto</option>
                                        <option value="bank">Financiero</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Categoría
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text"
                                    >
                                        <option value="Personal">Personal</option>
                                        <option value="Finanzas">Finanzas</option>
                                        <option value="Seguridad">Seguridad</option>
                                        <option value="Credenciales">Credenciales</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="sensitive"
                                    checked={formData.isSensitive}
                                    onChange={(e) => setFormData({ ...formData, isSensitive: e.target.checked })}
                                    className="w-4 h-4 text-brand"
                                />
                                <label htmlFor="sensitive" className="text-sm text-gray-700 dark:text-gray-300">
                                    Contenido sensible (requiere visualización explícita)
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Eliminar */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(null)}>
                    <div
                        className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-sm w-full p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                                Eliminar Elemento
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Esta acción no se puede deshacer
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleDelete(showDeleteModal)}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecureVaultView;