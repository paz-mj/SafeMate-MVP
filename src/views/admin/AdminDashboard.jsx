// src/views/admin/AdminDashboard.jsx
import { useState } from 'react';
import {
    FiPlus,
    FiUser,
    FiEye,
    FiEyeOff,
    FiFileText,
    FiTrash2,
    FiX,
    FiEdit,
    FiCopy,
    FiCheck,
    FiSearch
} from 'react-icons/fi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { fakeUsers, fakeLogs } from '../../data/fakeData';
import PasswordGeneratorModal from '../../components/PasswordGeneratorModal';

const AdminDashboard = ({ handleLogout, isDark, toggleDarkMode }) => {
    // Estados principales
    const [users, setUsers] = useState(fakeUsers);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [showLogsModal, setShowLogsModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(null);
    const [showPasswordGenerator, setShowPasswordGenerator] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Estado para el formulario de crear/editar
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Finanzas',
        password: ''
    });

    // Estado para verificación de contraseña
    const [passwordToCheck, setPasswordToCheck] = useState('');
    const [checkResult, setCheckResult] = useState(null);

    // Funciones CRUD
    const handleCreateUser = (e) => {
        e.preventDefault();

        if (editingUser) {
            // EDITAR usuario existente
            setUsers(users.map(u =>
                u.id === editingUser.id
                    ? { ...u, ...formData, password: formData.password || u.password }
                    : u
            ));
            alert(`Usuario "${formData.name}" actualizado exitosamente`);
        } else {
            // CREAR nuevo usuario
            const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                ...formData,
                status: 'green',
                lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
                password: formData.password || 'Temporal123!'
            };
            setUsers([...users, newUser]);
            alert(`Usuario "${formData.name}" creado exitosamente`);
        }

        // Reset y cerrar
        setShowCreateModal(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Finanzas', password: '' });
    };

    const handleDeleteUser = (userId) => {
        const user = users.find(u => u.id === userId);
        setUsers(users.filter(u => u.id !== userId));
        alert(`Usuario "${user.name}" eliminado exitosamente`);
        setShowDeleteModal(null);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '' // No mostramos la contraseña actual por seguridad
        });
        setShowCreateModal(true);
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Finanzas', password: '' });
        setShowCreateModal(true);
    };

    // Modal de contraseña
    const [showPassword, setShowPassword] = useState(false);
    const [copiedPassword, setCopiedPassword] = useState(false);

    const handleCopyPassword = async (password) => {
        try {
            await navigator.clipboard.writeText(password); // 1. Espera a que termine de copiar
            setCopiedPassword(true);
            setTimeout(() => setCopiedPassword(false), 2000);
        } catch (err) {
            console.error('Error al copiar la contraseña: ', err);
            alert('Error al copiar. Por favor, copia manualmente.');
        }
    };

    const handlePasswordGenerated = (newPassword) => {
        if (showPasswordModal) {
            // Actualizar contraseña del usuario
            setUsers(users.map(u =>
                u.id === showPasswordModal.id
                    ? { ...u, password: newPassword }
                    : u
            ));
            setShowPasswordModal({ ...showPasswordModal, password: newPassword });
            alert('Contraseña actualizada exitosamente');
        } else if (showCreateModal) {
            // Usar en formulario de crear/editar
            setFormData({ ...formData, password: newPassword });
        }
    };

    // Verificación de contraseña filtrada
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

    const getStatusIcon = (status) => {
        const icons = {
            green: { icon: '🛡️', text: 'Seguro', color: 'text-alert-green' },
            yellow: { icon: '⚠️', text: 'Advertencia', color: 'text-alert-yellow' },
            red: { icon: '🚨', text: 'Comprometido', color: 'text-alert-red' }
        };
        return icons[status] || icons.green;
    };

    return (
        <DashboardLayout
            viewTitle="Gestión de Cuentas"
            handleLogout={handleLogout}
            isDark={isDark}
            toggleDarkMode={toggleDarkMode}
            userRole="admin"
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Lista de Usuarios
                    </h1>
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                    >
                        <FiPlus className="w-5 h-5" />
                        Crear Usuario
                    </button>
                </div>

                {/* Herramienta de Comprobación de Contraseña */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FiSearch className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Verificar Contraseña Filtrada
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="password"
                            value={passwordToCheck}
                            onChange={(e) => setPasswordToCheck(e.target.value)}
                            placeholder="Ingresa una contraseña a verificar"
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
                                checkResult.status === 'danger' ? 'text-alert-red' : 'text-alert-green'
                            }`}>
                                {checkResult.message}
                            </p>
                        </div>
                    )}
                </div>

                {/* Tabla de Usuarios */}
                <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Estado (Leak)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Último Login
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {users.map((user) => {
                            const statusInfo = getStatusIcon(user.status);
                            return (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{statusInfo.icon}</span>
                                            <span className={`text-sm font-medium ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {user.lastLogin}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setShowPasswordModal(user)}
                                                title="Ver Contraseña"
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => setShowLogsModal(true)}
                                                title="Ver Logs"
                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                <FiFileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                title="Editar Usuario"
                                                className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                            >
                                                <FiEdit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(user.id)}
                                                title="Eliminar Usuario"
                                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Modal: Crear/Editar Usuario */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowCreateModal(false);
                                        setEditingUser(null);
                                    }}
                                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ej: Juan Pérez"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="juan.perez@empresa.cl"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Rol
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                                    >
                                        <option>Administrador</option>
                                        <option>Finanzas</option>
                                        <option>Ventas</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contraseña {editingUser && '(dejar vacío para mantener actual)'}
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            placeholder="Contraseña"
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordGenerator(true)}
                                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Generar
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setEditingUser(null);
                                        }}
                                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                                    >
                                        {editingUser ? 'Guardar Cambios' : 'Crear Usuario'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal: Ver Contraseña */}
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Contraseña de {showPasswordModal.name}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowPasswordModal(null);
                                        setShowPassword(false);
                                    }}
                                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Contraseña Actual
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={showPasswordModal.password}
                                            readOnly
                                            className="w-full px-4 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                            <button
                                                onClick={() => handleCopyPassword(showPasswordModal.password)}
                                                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                title="Copiar"
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
                                <button
                                    onClick={() => setShowPasswordGenerator(true)}
                                    className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors font-medium"
                                >
                                    Generar Nueva Contraseña
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal: Generador de Contraseñas */}
                {showPasswordGenerator && (
                    <PasswordGeneratorModal
                        onClose={() => setShowPasswordGenerator(false)}
                        onPasswordGenerated={handlePasswordGenerated}
                    />
                )}

                {/* Modal: Ver Logs */}
                {showLogsModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-2xl w-full mx-4">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Registro de Actividad
                                </h3>
                                <button
                                    onClick={() => setShowLogsModal(false)}
                                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <FiX className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {fakeLogs.map((log) => {
                                        const statusInfo = getStatusIcon(log.status);
                                        return (
                                            <div
                                                key={log.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">{statusInfo.icon}</span>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {log.site}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {log.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={`text-sm font-medium ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setShowLogsModal(false)}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal: Eliminar Usuario */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4">
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
                                    <FiTrash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
                                    Eliminar Usuario
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                                    ¿Estás seguro que quieres eliminar al usuario{' '}
                                    <span className="font-semibold text-gray-900 dark:text-white">
                    {users.find(u => u.id === showDeleteModal)?.name}
                  </span>?
                                </p>
                            </div>
                            <div className="flex items-center gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setShowDeleteModal(null)}
                                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(showDeleteModal)}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;