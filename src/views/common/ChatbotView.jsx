// src/views/ChatbotView.jsx
import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import { FiSend, FiMessageSquare } from 'react-icons/fi';

const ChatbotView = ({ handleLogout, isDark, toggleDarkMode, userRole = 'admin' }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: '👋 Hola, soy el asistente de SafeMate. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Agregar mensaje del usuario
        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputMessage
        };

        // Simular respuesta del bot
        const botMessage = {
            id: messages.length + 2,
            sender: 'bot',
            text: 'Esta es una demo del chatbot. En producción, aquí se procesaría tu consulta sobre seguridad.'
        };

        setMessages([...messages, userMessage, botMessage]);
        setInputMessage('');
    };

    return (
        <DashboardLayout
            viewTitle="Asistente Chatbot"
            handleLogout={handleLogout}
            isDark={isDark}
            toggleDarkMode={toggleDarkMode}
            userRole={userRole}
        >
            <div className="h-full flex flex-col p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Asistente de IA
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Consulta sobre seguridad, contraseñas y mejores prácticas
                    </p>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-4 ${
                                        message.sender === 'user'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                    }`}
                                >
                                    {message.sender === 'bot' && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiMessageSquare className="w-4 h-4" />
                                            <span className="text-sm font-semibold">SafeMate AI</span>
                                        </div>
                                    )}
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2"
                            >
                                <FiSend className="w-5 h-5" />
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChatbotView;