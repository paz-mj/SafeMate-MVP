// src/views/creator/CreateAccountModal.jsx
import { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
import { availablePlatforms } from '../../data/fakeCreatorData';

const CreateAccountModal = ({ onClose, onCreateAccount, existingPlatforms }) => {
    const [formData, setFormData] = useState({
        platform: '',
        username: '',
        email: '',
        password: ''
    });

    // Filtrar plataformas ya agregadas
    const availableOptions = availablePlatforms.filter(
        platform => !existingPlatforms.includes(platform.name)
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.platform || !formData.username || !formData.email || !formData.password) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Encontrar el ícono correspondiente
        const selectedPlatform = availablePlatforms.find(p => p.name === formData.platform);

        const newAccount = {
            id: Date.now(), // ID temporal
            platform: formData.platform,
            icon: selectedPlatform.icon,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            status: 'Secure',
            color: 'green',
            securityChecks: [
                { name: 'Verificación en dos pasos (2FA)', enabled: false },
                { name: 'Alertas de inicio de sesión', enabled: false },
                { name: 'Correo de recuperación actualizado', enabled: false },
            ]
        };

        onCreateAccount(newAccount);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-light-text dark:text-dark-text flex items-center gap-2">
                        <FiPlus className="w-5 h-5 text-brand" />
                        Agregar Nueva Red Social
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Plataforma */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Plataforma *
                        </label>
                        <select
                            value={formData.platform}
                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                            required
                        >
                            <option value="">Selecciona una plataforma</option>
                            {availableOptions.map((platform) => (
                                <option key={platform.name} value={platform.name}>
                                    {platform.name}
                                </option>
                            ))}
                        </select>
                        {availableOptions.length === 0 && (
                            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                                ⚠️ Ya has agregado todas las plataformas disponibles
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre de Usuario *
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="@usuario"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Asociado *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="email@ejemplo.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Contraseña segura"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Info */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-300">
                            💡 Recuerda usar contraseñas robustas y diferentes para cada plataforma.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={availableOptions.length === 0}
                            className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors disabled:opacity-50"
                        >
                            Agregar Cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountModal;