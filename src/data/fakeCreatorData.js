// src/data/fakeCreatorData.js - VERSIÓN ACTUALIZADA
import { FiInstagram, FiMusic, FiYoutube, FiMail, FiSlack, FiFigma, FiLinkedin, FiTwitter } from 'react-icons/fi';

// ✅ Estructura mejorada con contraseñas
export const fakeCreatorAccounts = [
    {
        id: 1,
        platform: 'Instagram',
        icon: FiInstagram,
        username: '@safe_creator',
        email: 'creator.pro@gmail.com',
        password: 'Inst@gr4mS3cur3!2024',
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
        icon: FiMusic,
        username: '@safe_creator_tok',
        email: 'creator.pro@gmail.com',
        password: 'T1kT0k!Secur3#2024',
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
        password: 'Y0uTub3$Str0ng!Pass',
        status: 'Secure',
        color: 'green',
        securityChecks: [
            { name: 'Verificación en dos pasos (2FA)', enabled: true },
            { name: 'Alertas de inicio de sesión', enabled: true },
            { name: 'Correo de recuperación actualizado', enabled: true },
        ],
    },
];

// ✅ Plataformas disponibles para crear nuevas cuentas
export const availablePlatforms = [
    { name: 'Instagram', icon: FiInstagram },
    { name: 'TikTok', icon: FiMusic },
    { name: 'YouTube', icon: FiYoutube },
    { name: 'Twitter', icon: FiTwitter },
    { name: 'LinkedIn', icon: FiLinkedin },
    { name: 'Figma', icon: FiFigma },
    { name: 'Slack', icon: FiSlack },
    { name: 'Gmail', icon: FiMail },
];