// src/views/admin/DashboardPanelView.jsx - NUEVO PANEL DE CONTROL
import {
    FiShield,
    FiAlertTriangle,
    FiUsers,
    FiActivity,
    FiTrendingUp,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';

const DashboardPanelView = () => {
    // Datos simulados para el dashboard
    const stats = {
        totalUsers: 15,
        secureUsers: 12,
        compromisedUsers: 1,
        warningUsers: 2,
        vulnerabilities: 3,
        monthlyIncidents: 7,
        accounts2FAEnabled: 10,
        accounts2FADisabled: 5
    };

    const recentAlerts = [
        { id: 1, type: 'critical', message: 'Contraseña comprometida detectada', user: 'María Fernández', time: '10 min' },
        { id: 2, type: 'warning', message: 'Inicio de sesión desde nueva ubicación', user: 'Javier Torres', time: '1 hora' },
        { id: 3, type: 'info', message: 'Nueva cuenta creada', user: 'Carlos Pérez', time: '2 horas' }
    ];

    const vulnerableAreas = [
        { area: 'Cuentas sin 2FA', level: 'high', percentage: 33, count: 5 },
        { area: 'Contraseñas débiles', level: 'medium', percentage: 20, count: 3 },
        { area: 'Accesos no verificados', level: 'low', percentage: 13, count: 2 }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Panel de Control
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Monitoreo general de seguridad y actividad del sistema
                </p>
            </div>

            {/* Cards de Estadísticas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Usuarios */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalUsers}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Usuarios activos</p>
                </div>

                {/* Usuarios Seguros */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <FiShield className="w-6 h-6 text-alert-green" />
                        </div>
                        <span className="text-xs text-alert-green font-semibold">+8%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.secureUsers}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cuentas seguras</p>
                </div>

                {/* Vulnerabilidades */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                            <FiAlertTriangle className="w-6 h-6 text-alert-yellow" />
                        </div>
                        <span className="text-xs text-alert-yellow font-semibold">-2</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.vulnerabilities}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Vulnerabilidades activas</p>
                </div>

                {/* Incidentes del Mes */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                            <FiActivity className="w-6 h-6 text-alert-red" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Este mes</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.monthlyIncidents}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Incidentes registrados</p>
                </div>
            </div>

            {/* Dos columnas: Áreas Vulnerables y Alertas Recientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Áreas Más Expuestas */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <FiTrendingUp className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                            Áreas Más Expuestas
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {vulnerableAreas.map((area, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {area.area}
                                    </span>
                                    <span className={`text-sm font-semibold ${
                                        area.level === 'high' ? 'text-alert-red' :
                                            area.level === 'medium' ? 'text-alert-yellow' :
                                                'text-blue-600 dark:text-blue-400'
                                    }`}>
                                        {area.count} usuarios ({area.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${
                                            area.level === 'high' ? 'bg-alert-red' :
                                                area.level === 'medium' ? 'bg-alert-yellow' :
                                                    'bg-blue-500'
                                        }`}
                                        style={{ width: `${area.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Alertas Recientes */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <FiActivity className="w-6 h-6 text-brand" />
                        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                            Alertas Recientes
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {recentAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className="p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                style={{
                                    borderLeftColor:
                                        alert.type === 'critical' ? '#EF4444' :
                                            alert.type === 'warning' ? '#F59E0B' :
                                                '#3B82F6'
                                }}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                            {alert.message}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Usuario: {alert.user}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                                        Hace {alert.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Estado de Autenticación 2FA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2FA Habilitado */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                            <FiCheckCircle className="w-6 h-6 text-alert-green" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.accounts2FAEnabled}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Cuentas con 2FA habilitado
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-alert-green"
                            style={{ width: '67%' }}
                        ></div>
                    </div>
                </div>

                {/* 2FA Deshabilitado */}
                <div className="bg-white dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                            <FiXCircle className="w-6 h-6 text-alert-red" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stats.accounts2FADisabled}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Cuentas sin 2FA (Acción requerida)
                            </p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-alert-red"
                            style={{ width: '33%' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPanelView;