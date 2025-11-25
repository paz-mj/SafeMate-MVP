// src/views/LandingBeta.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle, FiArrowRight, FiLoader, FiCpu, FiLock } from 'react-icons/fi';

// Tu URL de Google Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxnwvinm8p77PJ4QQRHcetxdkLkSTmyNRmbVER8maJZKJN7_M6tPOny55HbxQX7GmiarA/exec";

const LandingBeta = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '', perfil: 'Estudiante', so: 'Windows' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const formBody = new URLSearchParams(formData);
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formBody,
                mode: 'no-cors' // Importante para enviar a Google sin error de CORS
            });
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden font-sans">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#1E293B]/90 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/30 text-center max-w-md w-full shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">¡Registro Exitoso!</h2>
                    <p className="text-gray-400 mb-6">
                        Bienvenido al futuro de la ciberseguridad. Te notificaremos en <b>{formData.email}</b> cuando tu acceso esté listo.
                    </p>
                    <button onClick={() => window.location.href = '/'} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                        Ir al Inicio
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-white font-sans relative overflow-hidden selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 py-10 relative z-10">

                {/* Left Side: Pitch */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 max-w-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/SafeMateLogo2.png" alt="SafeMate" className="w-12 h-12 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <span className="text-xl font-bold tracking-widest text-blue-100">SAFEMATE <span className="text-blue-500 text-xs align-top">BETA</span></span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Seguridad que <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">evoluciona contigo.</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 leading-relaxed border-l-4 border-blue-500 pl-4">
                        Gestión. Educación. Prevención.La única plataforma que une un Dashboard de control total, un Chatbot que te enseña y una Extensión que te protege antes del clic. Sé de los primeros en probar SafeMate.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FiShield className="text-blue-400 w-5 h-5" /> <span>Escaneo de fugas 24/7</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FiCpu className="text-blue-400 w-5 h-5" /> <span>IA Anti-Phishing</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FiLock className="text-blue-400 w-5 h-5" /> <span>Encriptación Zero-Knowledge</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-[#1E293B]/80 backdrop-blur-md p-8 rounded-2xl border border-gray-700 shadow-2xl relative group">
                        {/* Glowing Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>

                        <div className="relative">
                            <h3 className="text-2xl font-bold mb-2">Solicitar Acceso</h3>
                            <p className="text-gray-400 text-sm mb-6">No pierdas la oportunidad de ser parte del futuro.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full mt-1 bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                        placeholder="Ej. Juan Pérez"
                                        value={formData.nombre}
                                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full mt-1 bg-[#0F172A] border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                        placeholder="juan@ejemplo.com"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Perfil</label>
                                        <select
                                            className="w-full mt-1 bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                            value={formData.perfil}
                                            onChange={e => setFormData({...formData, perfil: e.target.value})}
                                        >
                                            <option>Estudiante</option>
                                            <option>Profesor</option>
                                            <option>Empresa</option>
                                            <option>Tech Lover</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Sistema OP</label>
                                        <select
                                            className="w-full mt-1 bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                                            value={formData.so}
                                            onChange={e => setFormData({...formData, so: e.target.value})}
                                        >
                                            <option>Windows</option>
                                            <option>macOS</option>
                                            <option>Linux</option>
                                            <option>Móvil</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? <FiLoader className="animate-spin w-5 h-5" /> : <>Unirme Ahora <FiArrowRight /></>}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingBeta;