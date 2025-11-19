// src/data/fakeCreatorData.js - VERSIÓN AMPLIADA
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

// ✅ NUEVO: Clones detectados para Protección de Marca
export const fakeClones = [
    {
        id: 1,
        username: '@safe_creator_oficial',
        similarity: 95,
        status: 'pending', // 'pending' | 'reported' | 'ignored'
        avatarUrl: 'https://via.placeholder.com/100/FF6B6B/FFFFFF?text=SC',
        platform: 'Instagram',
        followers: '2.3K',
        detectedDate: '2024-11-15'
    },
    {
        id: 2,
        username: '@safecreator.pro',
        similarity: 88,
        status: 'pending',
        avatarUrl: 'https://via.placeholder.com/100/4ECDC4/FFFFFF?text=SC',
        platform: 'TikTok',
        followers: '1.8K',
        detectedDate: '2024-11-14'
    },
    {
        id: 3,
        username: '@safe.creator.real',
        similarity: 92,
        status: 'reported',
        avatarUrl: 'https://via.placeholder.com/100/95E1D3/FFFFFF?text=SC',
        platform: 'Instagram',
        followers: '890',
        detectedDate: '2024-11-13'
    },
    {
        id: 4,
        username: '@safecreator_verificado',
        similarity: 85,
        status: 'ignored',
        avatarUrl: 'https://via.placeholder.com/100/F38181/FFFFFF?text=SC',
        platform: 'Twitter',
        followers: '4.1K',
        detectedDate: '2024-11-12'
    }
];

// ✅ NUEVO: Items de la Bóveda Segura
export const fakeVaultItems = [
    {
        id: 1,
        title: 'Tarjeta de Crédito Principal',
        content: '4532 1234 5678 9010',
        type: 'bank',
        isSensitive: true,
        createdAt: '2024-11-10',
        category: 'Finanzas'
    },
    {
        id: 2,
        title: 'Código de Respaldo 2FA',
        content: 'A7B9-C3D2-E5F1-G8H4',
        type: 'text',
        isSensitive: true,
        createdAt: '2024-11-09',
        category: 'Seguridad'
    },
    {
        id: 3,
        title: 'Contraseña de Recuperación',
        content: 'X9k2mP7nQ5wL8vT3',
        type: 'text',
        isSensitive: true,
        createdAt: '2024-11-08',
        category: 'Credenciales'
    },
    {
        id: 4,
        title: 'Número de Cuenta Bancaria',
        content: '0123456789',
        type: 'bank',
        isSensitive: true,
        createdAt: '2024-11-07',
        category: 'Finanzas'
    },
    {
        id: 5,
        title: 'Notas Importantes',
        content: 'Reunión con equipo legal el 25/11 a las 15:00',
        type: 'text',
        isSensitive: false,
        createdAt: '2024-11-06',
        category: 'Personal'
    }
];