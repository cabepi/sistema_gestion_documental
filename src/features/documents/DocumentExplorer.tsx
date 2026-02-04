import React, { useEffect, useState } from 'react';
import { apiClient } from '../../api/client';
import { useNavigate } from 'react-router-dom';

interface Document {
    id: number;
    title: string;
    description: string;
    type_name: string;
    file_path: string;
    status: string;
    created_at: string;
    uploader_name: string;
}

export const DocumentExplorer: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (searchTerm) params.search = searchTerm;

            const res = await apiClient.get('/documents', { params });
            setDocuments(res.data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [searchTerm]); // Re-fetch when search changes (debounce could be added)

    const handleViewDocument = (id: number) => {
        navigate(`/viewer?id=${id}`);
    };

    const handleDownload = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row click
        try {
            // Fetch document details to get the fresh presigned URL
            const res = await apiClient.get(`/documents/${id}`);
            if (res.data.file_url) {
                window.open(res.data.file_url, '_blank');
            } else {
                alert('No hay archivo disponible para descargar.');
            }
        } catch (error) {
            console.error('Error downloading document:', error);
            alert('Error al descargar el documento.');
        }
    };

    const getFileIcon = (filePath: string) => {
        if (!filePath) return { icon: 'article', color: 'text-slate-400' };

        const ext = filePath.split('.').pop()?.toLowerCase() || '';

        if (['pdf'].includes(ext)) return { icon: 'picture_as_pdf', color: 'text-red-500' };
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return { icon: 'image', color: 'text-purple-500' };
        if (['doc', 'docx'].includes(ext)) return { icon: 'description', color: 'text-blue-600' };
        if (['xls', 'xlsx'].includes(ext)) return { icon: 'table_view', color: 'text-green-600' };

        return { icon: 'article', color: 'text-slate-400' };
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-black/5">
            {/* Filters & Tools */}
            <div className="px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input
                            type="text"
                            placeholder="Buscar documentos..."
                            className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all w-64 dark:text-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filtros
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <span className="material-symbols-outlined">view_list</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6">
                {loading ? (
                    <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                ) : (
                    <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Nombre del Archivo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha Carga</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Autor</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {documents.length === 0 ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No se encontraron documentos.</td></tr>
                                ) : (
                                    documents.map((doc) => {
                                        const fileIcon = getFileIcon(doc.file_path);
                                        return (
                                            <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`material-symbols-outlined ${fileIcon.color}`}>{fileIcon.icon}</span>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white cursor-pointer hover:text-primary" onClick={() => handleViewDocument(doc.id)}>{doc.title}</p>
                                                            <p className="text-xs text-slate-500">{doc.type_name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                    {new Date(doc.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                            {doc.uploader_name?.substring(0, 2).toUpperCase()}
                                                        </div>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">{doc.uploader_name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold 
                                                        ${doc.status === 'APPROVED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                            doc.status === 'DRAFT' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                                                'bg-slate-100 text-slate-600'}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button onClick={() => handleViewDocument(doc.id)} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Ver Documento">
                                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                        </button>
                                                        <button onClick={(e) => handleDownload(doc.id, e)} className="p-2 text-slate-400 hover:text-primary transition-colors" title="Descargar">
                                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination (Static for now) */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Mostrando <span className="font-bold text-slate-900 dark:text-white">{documents.length}</span> documentos</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-400 disabled:opacity-50" disabled>
                            Anterior
                        </button>
                        <button className="px-3 py-1 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 disabled:opacity-50" disabled>
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
