// src/views/admin/AdminAccountsView.jsx - VERSIÓN CORREGIDA
import { useState } from 'react';
import {
    FiPlus,
    FiUser,
    FiEye,
    FiEyeOff, // ✅ AGREGADO: Import faltante
    FiFileText,
    FiTrash2,
    FiX,
    FiEdit,
    FiCopy,
    FiSearch,
    FiCheck,
} from 'react-icons/fi';
import { fakeUsers, fakeLogs, compromisedPasswords } from '../../data/fakeData.js';
import PasswordGeneratorModal from '../../components/PasswordGeneratorModal.jsx';
import Toast from '../common/Toast.jsx';

const AdminAccountsView = ({ whitelist = [] }) => {
    const [users, setUsers] = useState(fakeUsers);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [showLogsModal, setShowLogsModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(null);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Finanzas',
        password: ''
    });

    const [passwordToCheck, setPasswordToCheck] = useState('');
    const [checkResult, setCheckResult] = useState(null);

    const getLogStatusInfo = (log) => {
        const normalizedLogSite = log.site.toLowerCase().trim();
        const isInWhitelist = whitelist.some(domain =>
            domain.toLowerCase().trim() === normalizedLogSite
        );

        if (isInWhitelist) {
            return { icon: '🛡️', text: 'Verificado', color: 'text-alert-green', bg: 'bg-green-100 dark:bg-green-900/30' };
        }
        if (log.status === 'red') {
            return { icon: '🚨', text: 'Peligroso', color: 'text-alert-red', bg: 'bg-red-100 dark:bg-red-900/30' };
        }
        return { icon: '⚠️', text: 'No Verificado', color: 'text-alert-yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    };

    const getStatusIcon = (status) => {
        const icons = {
            green: { icon: '🛡️', text: 'Seguro', color: 'text-alert-green' },
            yellow: { icon: '⚠️', text: 'Advertencia', color: 'text-alert-yellow' },
            red: { icon: '🚨', text: 'Comprometido', color: 'text-alert-red' }
        };
        return icons[status] || icons.green;
    };

    const handleCreateUser = (e) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData, password: formData.password || u.password } : u));
            setNotification({ type: 'success', message: `Usuario "${formData.name}" actualizado` });
        } else {
            const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                ...formData,
                status: 'green',
                lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
                password: formData.password || 'Temporal123!'
            };
            setUsers([...users, newUser]);
            setNotification({ type: 'success', message: `Usuario "${formData.name}" creado` });
        }
        setShowCreateModal(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Finanzas', password: '' });
    };

    const handleDeleteUser = (userId) => {
        const user = users.find(u => u.id === userId);
        setUsers(users.filter(u => u.id !== userId));
        setNotification({ type: 'success', message: `Usuario "${user.name}" eliminado` });
        setShowDeleteModal(null);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, password: '' });
        setShowCreateModal(true);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Finanzas', password: '' });
        setShowCreateModal(true);
    };

    const handleCopyPassword = async (password) => {
        try {
            await navigator.clipboard.writeText(password);
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
            setNotification({ type: 'success', message: 'Contraseña copiada' });
        } catch (err) {
            setNotification({ type: 'danger', message: 'Error al copiar' });
        }
    };

    const handlePasswordGenerated = (newPassword) => {
        if (showPasswordModal) {
            setUsers(users.map(u => u.id === showPasswordModal.id ? { ...u, password: newPassword } : u));
            setShowPasswordModal({ ...showPasswordModal, password: newPassword });
            setNotification({ type: 'success', message: 'Contraseña actualizada' });
        } else if (showCreateModal) {
            setFormData({ ...formData, password: newPassword });
        }
    };

    const handleCheckPassword = () => {
        if (!passwordToCheck) return;
        const compromisedUser = users.find(u => u.password === passwordToCheck && u.status === 'red');
        if (compromisedUser) {
            setCheckResult({ status: 'danger', message: `⚠️ ALERTA CRÍTICA: Pertenece a ${compromisedUser.name} (COMPROMETIDA)` });
            return;
        }
        const isInLeakedDatabase = compromisedPasswords.includes(passwordToCheck);
        if (isInLeakedDatabase) {
            setCheckResult({ status: 'danger', message: '🚨 Encontrada en filtraciones de datos' });
            return;
        }
        const commonWeakPasswords = ['password', 'admin', 'user', '123'];
        if (commonWeakPasswords.some(weak => passwordToCheck.toLowerCase().includes(weak))) {
            setCheckResult({ status: 'danger', message: '⚠️ Contraseña débil y predecible' });
            return;
        }
        setCheckResult({ status: 'safe', message: '✅ No aparece en filtraciones conocidas' });
    };

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text">Lista de Usuarios</h1>
                <button onClick={openCreateModal} className="flex items-center justify-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors w-full md:w-auto font-medium">
                    <FiPlus className="w-5 h-5" /> Crear Usuario
                </button>
            </div>

            {/* Verificador de Contraseña */}
            <div className="bg-light-surface dark:bg-dark-surface p-4 md:p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <FiSearch className="w-6 h-6 text-brand" />
                    <h2 className="text-lg md:text-xl font-semibold text-light-text dark:text-dark-text">Verificar Contraseña</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input type="password" value={passwordToCheck} onChange={(e) => setPasswordToCheck(e.target.value)} placeholder="Contraseña a verificar" className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text" />
                    <button onClick={handleCheckPassword} className="px-6 py-2 bg-brand text-white rounded-lg font-medium w-full sm:w-auto">Verificar</button>
                </div>
                {checkResult && (
                    <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${checkResult.status === 'danger' ? 'bg-red-50 text-alert-red dark:bg-red-900/20' : 'bg-green-50 text-alert-green dark:bg-green-900/20'}`}>
                        {checkResult.message}
                    </div>
                )}
            </div>

            {/* Vista Móvil: Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.map((user) => {
                    const statusInfo = getStatusIcon(user.status);
                    return (
                        <div key={user.id} className="bg-light-surface dark:bg-dark-surface p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-brand">
                                        <FiUser className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-light-text dark:text-dark-text">{user.name}</h3>
                                        <p className="text-xs text-gray-500">{user.role}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color} bg-opacity-10`}>
                                    {statusInfo.icon} {statusInfo.text}
                                </span>
                            </div>
                            <div className="space-y-2 mb-4 text-sm">
                                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium">Email:</span> {user.email}</p>
                                <p className="text-gray-600 dark:text-gray-400"><span className="font-medium">Último Login:</span> {user.lastLogin}</p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                <button onClick={() => setShowPasswordModal(user)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><FiEye className="w-5 h-5" /></button>
                                <button onClick={() => setShowLogsModal(true)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><FiFileText className="w-5 h-5" /></button>
                                <button onClick={() => handleEditUser(user)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><FiEdit className="w-5 h-5" /></button>
                                <button onClick={() => setShowDeleteModal(user.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><FiTrash2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Vista Escritorio: Tabla */}
            <div className="hidden md:block bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                        {['Usuario', 'Rol', 'Estado', 'Último Login', 'Acciones'].map(h => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map((user) => {
                        const statusInfo = getStatusIcon(user.status);
                        return (
                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><FiUser className="w-4 h-4 text-gray-500" /></div>
                                        <div><p className="font-medium text-light-text dark:text-dark-text">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-light-text dark:text-dark-text">{user.role}</td>
                                <td className="px-6 py-4"><div className={`flex items-center gap-1 text-sm font-medium ${statusInfo.color}`}>{statusInfo.icon} {statusInfo.text}</div></td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        <button onClick={() => setShowPasswordModal(user)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><FiEye className="w-4 h-4 text-gray-500" /></button>
                                        <button onClick={() => setShowLogsModal(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><FiFileText className="w-4 h-4 text-gray-500" /></button>
                                        <button onClick={() => handleEditUser(user)} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"><FiEdit className="w-4 h-4 text-blue-500" /></button>
                                        <button onClick={() => setShowDeleteModal(user.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><FiTrash2 className="w-4 h-4 text-red-500" /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Modal Crear/Editar Usuario */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
                    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">{editingUser ? 'Editar' : 'Crear'} Usuario</h3>
                            <button onClick={() => setShowCreateModal(false)}><FiX className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nombre" className="w-full p-2 border rounded dark:bg-dark-background dark:border-gray-600 dark:text-white" required />
                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full p-2 border rounded dark:bg-dark-background dark:border-gray-600 dark:text-white" required />
                            <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full p-2 border rounded dark:bg-dark-background dark:border-gray-600 dark:text-white"><option>Finanzas</option><option>Ventas</option><option>Administrador</option></select>
                            <div className="flex gap-2">
                                <input type="text" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="Contraseña" className="flex-1 p-2 border rounded dark:bg-dark-background dark:border-gray-600 dark:text-white" />
                                <button type="button" onClick={() => setShowPasswordGenerator(true)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">Generar</button>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-500">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-brand text-white rounded">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ✅ CORREGIDO: Modal de Contraseña con FiEyeOff importado */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPasswordModal(null)}>
                    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Contraseña de {showPasswordModal.name}</h3>
                            <button onClick={() => setShowPasswordModal(null)}><FiX className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="relative mb-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={showPasswordModal.password}
                                readOnly
                                className="w-full p-3 pr-24 border rounded-lg dark:bg-dark-background dark:border-gray-600 dark:text-white font-mono"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button
                                    onClick={() => handleCopyPassword(showPasswordModal.password)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title="Copiar contraseña"
                                >
                                    {copiedPassword ? (
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                    ) : (
                                        <FiCopy className="w-4 h-4 text-gray-500" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title={showPassword ? "Ocultar" : "Mostrar"}
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="w-4 h-4 text-gray-500" />
                                    ) : (
                                        <FiEye className="w-4 h-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button onClick={() => setShowPasswordGenerator(true)} className="w-full py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors">
                            Generar Nueva Contraseña
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Logs */}
            {showLogsModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLogsModal(false)}>
                    <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b dark:border-gray-700 flex justify-between">
                            <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Logs de Actividad</h3>
                            <button onClick={() => setShowLogsModal(false)}><FiX className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1 space-y-3">
                            {fakeLogs.map(log => {
                                const info = getLogStatusInfo(log);
                                return (
                                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="text-xl flex-shrink-0">{info.icon}</span>
                                            <div className="min-w-0">
                                                <p className="font-medium truncate text-light-text dark:text-dark-text">{log.site}</p>
                                                <p className="text-xs text-gray-500">{log.time}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${info.bg} ${info.color}`}>{info.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="p-6 border-t dark:border-gray-700 flex justify-end">
                            <button onClick={() => setShowLogsModal(false)} className="px-4 py-2 bg-brand text-white rounded">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-lg max-w-sm w-full text-center">
                        <FiTrash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold mb-2 text-light-text dark:text-dark-text">¿Eliminar Usuario?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Esta acción no se puede deshacer</p>
                        <div className="flex gap-2 justify-center">
                            <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Cancelar</button>
                            <button onClick={() => handleDeleteUser(showDeleteModal)} className="px-4 py-2 bg-red-500 text-white rounded">Eliminar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Generador de Contraseñas */}
            {showPasswordGenerator && (
                <PasswordGeneratorModal
                    onClose={() => setShowPasswordGenerator(false)}
                    onPasswordGenerated={handlePasswordGenerated}
                />
            )}

            <Toast notification={notification} onClose={() => setNotification(null)} />
        </div>
    );
};

export default AdminAccountsView;