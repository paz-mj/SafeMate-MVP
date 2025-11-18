// src/views/common/ChatbotView.jsx
import { useState } from 'react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';

const ChatbotView = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: '👋 Hola, soy el asistente de SafeMate. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputMessage
        };

        const botMessage = {
            id: messages.length + 2,
            sender: 'bot',
            text: 'Esta es una demo del chatbot. En producción, aquí se procesaría tu consulta sobre seguridad.'
        };

        setMessages([...messages, userMessage, botMessage]);
        setInputMessage('');
    };

    return (

        <div className="w-full h-full flex flex-col overflow-hidden">

            <div className="flex-1 flex flex-col p-2 sm:p-6 gap-3 sm:gap-6 h-full min-h-0">

                {/* Header */}
                {/* 'shrink-0' evita que el header se aplaste si falta espacio */}
                <div className="mb-1 sm:mb-4 px-1 shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-1 sm:mb-2">
                        Asistente de IA
                    </h1>
                    <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary">
                        Consulta sobre seguridad, contraseñas y mejores prácticas
                    </p>
                </div>

                <div className="flex-1 min-h-0 bg-light-surface dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col shadow-sm">

                    {/* Messages Area */}
                    {/* 'overflow-y-auto' aquí maneja el scroll SOLO de los mensajes */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-3 sm:p-4 shadow-sm ${
                                        message.sender === 'user'
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-light-text dark:text-dark-text'
                                    }`}
                                >
                                    {message.sender === 'bot' && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiMessageSquare className="w-4 h-4 opacity-70" />
                                            <span className="text-xs sm:text-sm font-semibold opacity-90">SafeMate AI</span>
                                        </div>
                                    )}
                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-light-surface dark:bg-dark-surface shrink-0 rounded-b-lg">
                        <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand focus:border-transparent text-sm sm:text-base transition-all"
                            />
                            <button
                                type="submit"
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-brand text-white rounded-lg hover:bg-brand-hover transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md active:scale-95 transform duration-100"
                            >
                                <FiSend className="w-5 h-5" />
                                <span className="hidden sm:inline font-medium">Enviar</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotView;