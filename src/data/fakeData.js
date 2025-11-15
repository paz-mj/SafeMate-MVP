// src/data/fakeData.js

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
        status: 'red',
        password: 'Weak123!',
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

export const fakeLogs = [
    { id: 1, site: 'mail.google.com', time: '10:30 AM', status: 'green' },
    { id: 2, site: 'bancoestado-login.com', time: '10:32 AM', status: 'red' },
    { id: 3, site: 'linkedin.com', time: '10:35 AM', status: 'yellow' },
    { id: 4, site: 'erp.empresa.cl', time: '10:40 AM', status: 'green' },
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
