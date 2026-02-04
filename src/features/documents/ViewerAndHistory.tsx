import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';

export const ViewerAndHistory: React.FC = () => {
    const [searchParams] = useSearchParams();
    const docId = searchParams.get('id');
    const navigate = useNavigate();
    const [document, setDocument] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');
    const [history, setHistory] = useState<any[]>([]);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const fetchDocument = async () => {
            if (!docId) return;
            try {
                const res = await apiClient.get(`/documents/${docId}`);
                setDocument(res.data);
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchHistory = async () => {
            if (!docId) return;
            try {
                const res = await apiClient.get(`/documents/${docId}/history`);
                setHistory(res.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchDocument();
        fetchHistory();
    }, [docId]);

    const handleBack = () => navigate(-1);

    const updateStatus = async (newStatus: string, reason?: string) => {
        try {
            const res = await apiClient.patch(`/documents/${docId}/status`, { status: newStatus, reason });
            setDocument({ ...document, status: res.data.status });
            setIsRejectModalOpen(false);
            setRejectReason('');

            // Refresh history
            const historyRes = await apiClient.get(`/documents/${docId}/history`);
            setHistory(historyRes.data);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar el estado del documento');
        }
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

    if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-background-dark dark:text-white">Cargando documento...</div>;
    if (!document) return <div className="min-h-screen flex items-center justify-center dark:bg-background-dark dark:text-white">Documento no encontrado o ID inválido.</div>;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'APPROVED': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'REJECTED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'REVIEW': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'DRAFT': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111718] dark:text-white min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a3c3f] bg-white dark:bg-[#111718] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#111718] dark:text-white cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">account_balance</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[#111718] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">MiCultura SGD</h2>
                            <span className="text-[10px] uppercase tracking-wider text-[#618389]">Ministerio de Cultura de Panamá</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <button onClick={handleBack} className="text-[#111718] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Volver
                    </button>
                    <div className="h-6 w-px bg-[#e5e7eb] dark:border-[#2a3c3f]"></div>
                    <span className={`font-bold text-xs px-3 py-1 rounded uppercase tracking-wide ${getStatusColor(document.status)}`}>
                        {document.status}
                    </span>
                </div>
            </header>

            {/* Subheader Action Bar */}
            <div className="bg-white dark:bg-[#111718] border-b border-[#e5e7eb] dark:border-[#2a3c3f] px-10 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#618389] text-sm">
                        <span className="hover:text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>Inicio</span>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-[#111718] dark:text-white font-medium">{document.title}</span>
                    </div>
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">{document.type_name}</span>
                </div>
                <div className="flex items-center gap-2">
                    {document.status !== 'REJECTED' && (
                        <button
                            onClick={() => setIsRejectModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 transition-colors text-sm font-medium"
                        >
                            <span className="material-symbols-outlined text-lg">cancel</span>
                            Rechazar
                        </button>
                    )}
                    {document.status !== 'APPROVED' && (
                        <button
                            onClick={() => updateStatus('APPROVED')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-[#111718] hover:bg-opacity-90 transition-all text-sm font-bold"
                        >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            Aprobar Documento
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Center Section: Document Viewer & Comments */}
                <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide bg-[#f0f4f4] dark:bg-background-dark p-6 gap-6">
                    {/* Viewer Container */}
                    <div className="bg-white dark:bg-[#111718] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a3c3f] flex-1 flex flex-col min-h-[600px]">
                        <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#2a3c3f]">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">description</span>
                                <h3 className="font-bold text-[#111718] dark:text-white">{document.title}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                                    <button onClick={handleZoomOut} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-500"><span className="material-symbols-outlined text-lg">remove</span></button>
                                    <span className="text-xs font-bold w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                                    <button onClick={handleZoomIn} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-500"><span className="material-symbols-outlined text-lg">add</span></button>
                                </div>
                                <a href={document.file_url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                    Abrir Original
                                </a>
                            </div>
                        </div>
                        {/* Canvas Placeholder */}
                    </div>
                    {/* Zoom wrapper */}
                    <div className="flex-1 bg-gray-200 dark:bg-gray-900 m-8 rounded border-dashed border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden relative">
                        <div style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {document.file_url ? (
                                (() => {
                                    // Helper to determine type from file usage or extension
                                    // Ideally we should store mimetype in DB, but we can infer from extension/url for now
                                    const ext = document.file_path?.split('.').pop()?.toLowerCase();
                                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
                                    const isPdf = ext === 'pdf';
                                    const isOffice = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext);

                                    if (isImage) {
                                        return <img src={document.file_url} className="max-w-full max-h-full object-contain" alt="Document Preview" />;
                                    } else if (isPdf) {
                                        return <iframe src={document.file_url} className="w-full h-full" title="Document Preview" />;
                                    } else if (isOffice) {
                                        // Use Microsoft Office Web Viewer
                                        // Note: This requires the file_url to be publicly accessible (which presigned URLs usually are)
                                        const encodedUrl = encodeURIComponent(document.file_url);
                                        return (
                                            <iframe
                                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}`}
                                                className="w-full h-full"
                                                title="Office Document Preview"
                                            />
                                        );
                                    } else {
                                        return (
                                            <div className="text-center p-8">
                                                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">download_for_offline</span>
                                                <p className="text-gray-500 font-medium mb-4">Vista previa no disponible para este formato ({ext})</p>
                                                <a href={document.file_url} className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90">Descargar Archivo</a>
                                            </div>
                                        );
                                    }
                                })()
                            ) : (
                                <div className="text-center p-8">
                                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">broken_image</span>
                                    <p className="text-gray-500 font-medium">No hay archivo adjunto</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-[400px] border-l border-[#e5e7eb] dark:border-[#2a3c3f] bg-white dark:bg-[#111718] flex flex-col">
                    <div className="flex border-b border-[#e5e7eb] dark:border-[#2a3c3f] px-4 pt-4">
                        <button onClick={() => setActiveTab('details')} className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-primary text-[#111718] dark:text-white' : 'border-transparent text-[#618389]'}`}>Detalles</button>
                        <button onClick={() => setActiveTab('history')} className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary text-[#111718] dark:text-white' : 'border-transparent text-[#618389]'}`}>Historial</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        {activeTab === 'details' ? (
                            <section className="animate-fade-in">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-[#618389] mb-4">Metadatos</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-[#618389] mb-1">Tipo de Documento</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{document.type_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#618389] mb-1">Fecha de Creación</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{new Date(document.created_at).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#618389] mb-1">Autor / Cargado por</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{document.uploader_name}</p>
                                        <p className="text-xs text-slate-500">{document.uploader_department}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#618389] mb-1">Descripción</p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">{document.description || 'Sin descripción'}</p>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="animate-fade-in relative">
                                <div className="absolute left-[19px] top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                                <div className="space-y-6">
                                    {history.map((log) => (
                                        <div key={log.id} className="relative pl-10">
                                            <div className="absolute left-0 top-0 size-10 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-[#111718] flex items-center justify-center z-10">
                                                {log.avatar_url ? (
                                                    <img src={log.avatar_url} className="size-full rounded-full" alt="User" />
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-500">{log.user_name?.substring(0, 2).toUpperCase()}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {log.action === 'APPROVE' && 'Aprobó el documento'}
                                                    {log.action === 'REJECT' && 'Rechazó el documento'}
                                                    {log.action === 'UPDATE_STATUS' && 'Actualizó estado'}
                                                    {!['APPROVE', 'REJECT', 'UPDATE_STATUS'].includes(log.action) && log.action}
                                                </p>
                                                <p className="text-xs text-slate-500 mb-1">{log.user_name} • {new Date(log.created_at).toLocaleString()}</p>
                                                {log.details && log.details.reason && (
                                                    <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 text-xs rounded-lg border border-red-100 dark:border-red-900/20 italic">
                                                        "{log.details.reason}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {history.length === 0 && <p className="text-sm text-slate-500 italic pl-2">Sin historial registrado.</p>}
                                </div>
                            </section>
                        )}
                    </div>
                </aside>
            </main >

            {/* Rejection Modal */}
            {
                isRejectModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-bounce-slow">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900 dark:text-white">Rechazar Documento</h3>
                                <button onClick={() => setIsRejectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                                    Por favor indica el motivo por el cual estás rechazando este documento. Esta información quedará registrada en el historial.
                                </p>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Escribe el motivo del rechazo..."
                                    className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none mb-4"
                                />
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsRejectModalOpen(false)}
                                        className="px-4 py-2 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => updateStatus('REJECTED', rejectReason)}
                                        disabled={!rejectReason.trim()}
                                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Confirmar Rechazo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
