// src/data/fakeData.js - VERSIÓN CORREGIDA Y AMPLIADA

export const fakeUsers = [
    {
        id: 1,
        name: 'Ana García',
        email: 'ana.garcia@empresa.cl',
        role: 'Administrador',
        status: 'green',
        password: 'P4ssw0rd!1',
        lastLogin: '2024-11-15 14:30'
    },
    {
        id: 2,
        name: 'Carlos Pérez',
        email: 'carlos.perez@empresa.cl',
        role: 'Finanzas',
        status: 'green',
        password: 'S3cur3P@ss',
        lastLogin: '2024-11-15 10:15'
    },
    {
        id: 3,
        name: 'María Fernández',
        email: 'maria.fernandez@empresa.cl',
        role: 'Ventas',
        status: 'red', // ← Usuario comprometido
        password: 'Weak123!', // ← Contraseña comprometida
        lastLogin: '2024-11-14 16:45'
    },
    {
        id: 4,
        name: 'Javier Torres',
        email: 'javier.torres@empresa.cl',
        role: 'Ventas',
        status: 'yellow',
        password: 'MyP@ssw0rd2024',
        lastLogin: '2024-11-15 09:00'
    },
];

// ✅ LOGS AMPLIADOS CON MÁS ENTRADAS PARA SCROLL
export const fakeLogs = [
    // Dominios seguros (deberían estar en whitelist)
    { id: 1, site: 'mail.google.com', time: '10:30 AM', status: 'green' },
    { id: 4, site: 'erp.empresa.cl', time: '10:40 AM', status: 'green' },
    { id: 7, site: 'drive.google.com', time: '11:15 AM', status: 'green' },
    { id: 10, site: 'calendar.google.com', time: '12:20 PM', status: 'green' },

    // Dominios peligrosos (phishing/maliciosos)
    { id: 2, site: 'bancoestado-login.com', time: '10:32 AM', status: 'red' },
    { id: 5, site: 'paypal-verificacion.xyz', time: '10:45 AM', status: 'red' },
    { id: 9, site: 'login-microsoft.tk', time: '11:50 AM', status: 'red' },

    // Dominios sin verificar
    { id: 3, site: 'linkedin.com', time: '10:35 AM', status: 'yellow' },
    { id: 6, site: 'twitter.com', time: '11:00 AM', status: 'yellow' },
    { id: 8, site: 'github.com', time: '11:30 AM', status: 'yellow' },
    { id: 11, site: 'stackoverflow.com', time: '12:30 PM', status: 'yellow' },
    { id: 12, site: 'youtube.com', time: '01:00 PM', status: 'yellow' },
    { id: 13, site: 'notion.so', time: '01:15 PM', status: 'yellow' },
    { id: 14, site: 'figma.com', time: '01:30 PM', status: 'yellow' },
    { id: 15, site: 'slack.com', time: '01:45 PM', status: 'yellow' },
];

export const fakeNotifications = [
    {
        id: 1,
        message: 'María Fernández: Contraseña filtrada detectada',
        type: 'danger',
        time: 'Hace 10 min'
    },
    {
        id: 2,
        message: 'Nuevo usuario registrado: Javier Torres',
        type: 'info',
        time: 'Hace 1 hora'
    },
    {
        id: 3,
        message: 'Actualización de seguridad disponible',
        type: 'warning',
        time: 'Hace 2 horas'
    },
];

// ✅ NUEVA EXPORTACIÓN: Lista de contraseñas comprometidas conocidas
export const compromisedPasswords = [
    'Weak123!',      // Contraseña de María Fernández
    '123456',
    'password',
    'admin',
    '12345678',
    'qwerty',
    '123456789',
    'letmein',
    'welcome',
    'monkey',
    '1234567890',
    'password123',
    'admin123',
    'pass123',
];