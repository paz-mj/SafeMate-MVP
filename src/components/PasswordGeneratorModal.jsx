// src/components/PasswordGeneratorModal.jsx
import { useState, useEffect } from 'react';
import { FiX, FiRotateCw, FiCopy, FiCheck } from 'react-icons/fi';

const PasswordGeneratorModal = ({ onClose, onPasswordGenerated }) => {
    const [length, setLength] = useState(20);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    // Generar contraseña robusta
    const generatePassword = (len) => {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const allChars = uppercase + lowercase + numbers + symbols;

        let newPassword = '';
        // Asegurar al menos un carácter de cada tipo
        newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
        newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
        newPassword += numbers[Math.floor(Math.random() * numbers.length)];
        newPassword += symbols[Math.floor(Math.random() * symbols.length)];

        // Completar el resto
        for (let i = newPassword.length; i < len; i++) {
            newPassword += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Mezclar
        return newPassword.split('').sort(() => Math.random() - 0.5).join('');
    };

    // Generar al abrir el modal
    useEffect(() => {
        setPassword(generatePassword(length));
    }, []);

    const handleRegenerate = () => {
        setPassword(generatePassword(length));
        setCopied(false);
    };

    const handleLengthChange = (newLength) => {
        setLength(newLength);
        setPassword(generatePassword(newLength));
        setCopied(false);
    };

    const handleCopy = async () => { // <--- 1. Añadir 'async'
        try {
            await navigator.clipboard.writeText(password); // <--- 2. Añadir 'await'
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar la contraseña: ', err);
            // (Opcional: mostrar un error al usuario)
        }
    };

    const handleUsePassword = () => {
        onPasswordGenerated(password);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-surface rounded-lg shadow-xl max-w-lg w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Generador de Contraseñas Robustas
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Contraseña Generada */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contraseña Generada
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className="w-full px-4 py-3 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title="Copiar"
                                >
                                    {copied ? (
                                        <FiCheck className="w-4 h-4 text-alert-green" />
                                    ) : (
                                        <FiCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    )}
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title="Regenerar"
                                >
                                    <FiRotateCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Longitud */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Longitud de la Contraseña
                        </label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleLengthChange(20)}
                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                                    length === 20
                                        ? 'bg-brand text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                20 caracteres
                            </button>
                            <button
                                onClick={() => handleLengthChange(30)}
                                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                                    length === 30
                                        ? 'bg-brand text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                30 caracteres
                            </button>
                        </div>
                    </div>

                    {/* Información */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            💡 Esta contraseña incluye mayúsculas, minúsculas, números y símbolos especiales para máxima seguridad.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleUsePassword}
                        className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors"
                    >
                        Usar esta Contraseña
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordGeneratorModal;