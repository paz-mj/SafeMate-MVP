// src/views/common/Login.jsx
import { useState } from 'react';
import { LuMail, LuLock } from 'react-icons/lu';
import Toast from '../../views/common/Toast';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica de login "hard-codeada" para demo
        if (email.startsWith('admin@')) {
            onLogin('admin');
        } else if (email.startsWith('empleado@')) {
            onLogin('empleado');
        } else if (email.startsWith('creator@')) {
            onLogin('creator');
        } else {
            setNotification({
                type: 'danger',
                message: 'Usuario no válido. Prueba con: admin@empresa.cl, empleado@empresa.cl o creator@empresa.cl'
            });
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo y Título */}
                    <div className="text-center mb-8">
                        <img
                            src="/SafeMateLogo.png"
                            alt="SafeMate Logo"
                            className="w-[100px] h-[100px] mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-white mb-2">SafeMate</h1>
                        <p className="text-gray-400">Dashboard de Ciberseguridad</p>
                    </div>

                    {/* Formulario de Login */}
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                        <h2 className="text-xl font-semibold text-white mb-6">Iniciar Sesión</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LuMail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                                        placeholder="usuario@empresa.cl"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LuLock className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Botón Submit */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-brand hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                Ingresar
                            </button>
                        </form>

                        {/* Helper Text */}
                        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                            <p className="text-xs text-gray-400 mb-2">💡 Usuarios de prueba:</p>
                            <ul className="text-xs text-gray-300 space-y-1">
                                <li>• <span className="font-mono">admin@empresa.cl</span> - Administrador</li>
                                <li>• <span className="font-mono">empleado@empresa.cl</span> - Empleado</li>
                                <li>• <span className="font-mono">creator@empresa.cl</span> - Creador</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        SafeMate © 2025 - Protegiendo tu empresa y tu privacidad
                    </p>
                </div>
            </div>

            {/* Toast de Notificaciones */}
            <Toast notification={notification} onClose={() => setNotification(null)} />
        </>
    );
};

export default Login;