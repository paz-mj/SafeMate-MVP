// src/views/creator/BrandProteccionView.jsx
import { useState } from 'react';
import {
    FiShield,
    FiCopy,
    FiCheck,
    FiRefreshCw,
    FiAlertTriangle,
    FiCheckCircle,
    FiXCircle,
    // ✅ NUEVOS ICONOS IMPORTADOS
    FiInstagram,
    FiTwitter,
    FiYoutube,
    FiLinkedin,
    FiMusic, // Usaremos este para TikTok si no tienes FontAwesome instalado
    FiGlobe
} from 'react-icons/fi';
import { fakeClones } from '../../data/fakeCreatorData';
import Toast from '../common/Toast';

const BrandProtectionView = () => {
    const [activeTab, setActiveTab] = useState('seal'); // 'seal' | 'clones'
    const [sealActive, setSealActive] = useState(true);
    const [copiedLink, setCopiedLink] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [clones, setClones] = useState(fakeClones);
    const [notification, setNotification] = useState(null);

    const publicSealLink = 'https://safemate.app/verify/@safe_creator';

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(publicSealLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
            setNotification({
                type: 'success',
                message: 'Link copiado al portapapeles'
            });
        } catch (err) {
            setNotification({
                type: 'danger',
                message: 'Error al copiar'
            });
        }
    };

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setNotification({
                type: 'info',
                message: 'Escaneo completado. No se encontraron nuevos clones.'
            });
        }, 2000);
    };

    const handleCloneAction = (cloneId, action) => {
        setClones(clones.map(clone =>
            clone.id === cloneId ? { ...clone, status: action } : clone
        ));

        const actionMessages = {
            'reported': 'Clon reportado exitosamente',
            'ignored': 'Clon marcado como ignorado'
        };

        setNotification({
            type: 'success',
            message: actionMessages[action]
        });
    };

    // ✅ NUEVA FUNCIÓN: Obtener icono según plataforma
    const getCloneIcon = (platform) => {
        const p = platform.toLowerCase();
        // Ajustamos colores y iconos
        if (p.includes('instagram')) return <FiInstagram className="w-8 h-8 text-pink-600" />;
        if (p.includes('tiktok')) return <FiMusic className="w-8 h-8 text-gray-900 dark:text-white" />;
        if (p.includes('twitter') || p.includes('x')) return <FiTwitter className="w-8 h-8 text-blue-400" />;
        if (p.includes('youtube')) return <FiYoutube className="w-8 h-8 text-red-600" />;
        if (p.includes('linkedin')) return <FiLinkedin className="w-8 h-8 text-blue-700" />;

        return <FiGlobe className="w-8 h-8 text-gray-500" />;
    };

    const getStatusBadge = (status) => {
        const config = {
            'pending': {
                icon: FiAlertTriangle,
                text: 'Pendiente',
                color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
            },
            'reported': {
                icon: FiCheckCircle,
                text: 'Reportado',
                color: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
            },
            'ignored': {
                icon: FiXCircle,
                text: 'Ignorado',
                color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
            }
        };

        const { icon: Icon, text, color } = config[status];

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                <Icon className="w-3 h-3" />
                {text}
            </span>
        );
    };

    return (
        <div className="p-4 md:p-6">
            <Toast notification={notification} onClose={() => setNotification(null)} />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Protección de Marca
                </h1>
                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                    Protege tu identidad digital y detecta cuentas falsas
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('seal')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                        activeTab === 'seal'
                            ? 'border-brand text-brand'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    🛡️ Sello de Verificación
                </button>
                <button
                    onClick={() => setActiveTab('clones')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                        activeTab === 'clones'
                            ? 'border-brand text-brand'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    🔍 Detectar Clones
                </button>
            </div>

            {/* Tab Content: Sello */}
            {activeTab === 'seal' && (
                <div className="space-y-6">
                    {/* ... (El contenido del Sello se mantiene igual) ... */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 md:p-8 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-24 h-24 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                                <FiShield className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Sello de Verificación Activo
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Tu marca está protegida con nuestro sello digital de autenticidad
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Estado:</span>
                                <label className="relative inline-block w-14 h-8 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={sealActive}
                                        onChange={(e) => {
                                            setSealActive(e.target.checked);
                                            setNotification({
                                                type: e.target.checked ? 'success' : 'warning',
                                                message: e.target.checked ? 'Sello activado' : 'Sello desactivado'
                                            });
                                        }}
                                        className="opacity-0 w-0 h-0 peer"
                                    />
                                    <span className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors peer-checked:bg-brand"></span>
                                    <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                            Link Público de Verificación
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Comparte este link para que tus seguidores verifiquen tu autenticidad
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={publicSealLink}
                                readOnly
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-light-text dark:text-dark-text font-mono text-sm"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {copiedLink ? (
                                    <>
                                        <FiCheck className="w-4 h-4" />
                                        Copiado
                                    </>
                                ) : (
                                    <>
                                        <FiCopy className="w-4 h-4" />
                                        Copiar Link
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content: Clones */}
            {activeTab === 'clones' && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
                                Detección Automática
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Última actualización: Hace 2 horas
                            </p>
                        </div>
                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center"
                        >
                            <FiRefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                            {isScanning ? 'Escaneando...' : 'Escanear Ahora'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {clones.map((clone) => (
                            <div
                                key={clone.id}
                                className="bg-light-surface dark:bg-dark-surface p-4 md:p-6 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Avatar y Info - ✅ MODIFICADO AQUÍ */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                            {getCloneIcon(clone.platform)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h4 className="font-semibold text-light-text dark:text-dark-text truncate">
                                                    {clone.username}
                                                </h4>
                                                {getStatusBadge(clone.status)}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {clone.platform} • {clone.followers} seguidores
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                    <div
                                                        className="bg-alert-red h-2 rounded-full"
                                                        style={{ width: `${clone.similarity}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-alert-red">
                                                    {clone.similarity}% similar
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Acciones */}
                                    {clone.status === 'pending' && (
                                        <div className="flex flex-col sm:flex-row gap-2 md:min-w-[200px]">
                                            <button
                                                onClick={() => handleCloneAction(clone.id, 'reported')}
                                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                            >
                                                Reportar
                                            </button>
                                            <button
                                                onClick={() => handleCloneAction(clone.id, 'ignored')}
                                                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                                            >
                                                Ignorar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandProtectionView;