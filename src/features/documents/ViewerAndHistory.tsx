import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';

export const ViewerAndHistory: React.FC = () => {
    const [searchParams] = useSearchParams();
    const docId = searchParams.get('id');
    const navigate = useNavigate();
    const [document, setDocument] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

        fetchDocument();
    }, [docId]);

    const handleBack = () => navigate(-1);

    const updateStatus = async (newStatus: string) => {
        try {
            const res = await apiClient.patch(`/documents/${docId}/status`, { status: newStatus });
            setDocument({ ...document, status: res.data.status });
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar el estado del documento');
        }
    };

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
                            onClick={() => updateStatus('REJECTED')}
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
                            <a href={document.file_url} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">open_in_new</span>
                                Abrir Original
                            </a>
                        </div>
                        {/* Canvas Placeholder */}
                        <div className="flex-1 bg-gray-200 dark:bg-gray-900 m-8 rounded border-dashed border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                            {document.file_url ? (
                                <iframe src={document.file_url} className="w-full h-full" title="Document Preview" />
                            ) : (
                                <div className="text-center p-8">
                                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">picture_as_pdf</span>
                                    <p className="text-gray-500 font-medium">Previsualización no disponible</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-[400px] border-l border-[#e5e7eb] dark:border-[#2a3c3f] bg-white dark:bg-[#111718] flex flex-col">
                    <div className="flex border-b border-[#e5e7eb] dark:border-[#2a3c3f] px-4 pt-4">
                        <button className="flex-1 pb-3 text-sm font-medium border-b-2 border-primary text-[#111718] dark:text-white">Detalles</button>
                        <button className="flex-1 pb-3 text-sm font-medium border-b-2 border-transparent text-[#618389]">Historial</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        <section>
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
                    </div>
                </aside>
            </main>
        </div>
    );
};
