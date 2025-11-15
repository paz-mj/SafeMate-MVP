// src/data/fakeCreatorData.js
import { FiInstagram, FiMusic, FiYoutube, FiMail, FiSlack, FiFigma } from 'react-icons/fi';

export const fakeCreatorAccounts = [
    {
        id: 1,
        platform: 'Instagram',
        icon: FiInstagram,
        username: '@safe_creator',
        email: 'creator.pro@gmail.com',
        status: 'Secure',
        color: 'green',
        securityChecks: [
            { name: 'Verificación en dos pasos (2FA)', enabled: true },
            { name: 'Alertas de inicio de sesión', enabled: true },
            { name: 'Correo de recuperación actualizado', enabled: true },
        ],
    },
    {
        id: 2,
        platform: 'TikTok',
        icon: FiMusic, // Proxy para TikTok
        username: '@safe_creator_tok',
        email: 'creator.pro@gmail.com',
        status: 'Warning',
        color: 'yellow',
        securityChecks: [
            { name: 'Verificación en dos pasos (2FA)', enabled: true },
            { name: 'Alertas de inicio de sesión', enabled: false },
            { name: 'Correo de recuperación actualizado', enabled: true },
        ],
    },
    {
        id: 3,
        platform: 'YouTube',
        icon: FiYoutube,
        username: 'SafeCreator Channel',
        email: 'business.creator@gmail.com',
        status: 'Secure',
        color: 'green',
        securityChecks: [
            { name: 'Verificación en dos pasos (2FA)', enabled: true },
            { name: 'Alertas de inicio de sesión', enabled: true },
            { name: 'Correo de recuperación actualizado', enabled: true },
        ],
    },
    {
        id: 4,
        platform: 'Gmail',
        icon: FiMail,
        status: 'Critical',
        color: 'red',
        // Datos especiales para la vista de Gmail
        associatedEmails: [
            {
                email: 'creator.pro@gmail.com',
                platforms: [FiInstagram, FiMusic], // Asociado a IG y TikTok
            },
            {
                email: 'business.creator@gmail.com',
                platforms: [FiYoutube], // Asociado a YouTube
            },
            {
                email: 'personal.creator@gmail.com',
                platforms: [FiSlack, FiFigma, FiMail, FiInstagram, FiYoutube], // "Plataformas Múltiples"
            },
        ]
    },
];