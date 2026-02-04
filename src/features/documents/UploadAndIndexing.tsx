import React, { useState, useRef, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { useNavigate } from 'react-router-dom';

export const UploadAndIndexing: React.FC = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [ocrProgress, setOcrProgress] = useState(0);
    const [ocrStatus, setOcrStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
    const [isDragging, setIsDragging] = useState(false);

    // Form State
    const [docType, setDocType] = useState('MEMORANDO'); // Default to a known code
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            handleFileSelection(droppedFile);
        } else {
            alert('Por favor, sube un archivo PDF válido.');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelection(e.target.files[0]);
        }
    };

    const handleFileSelection = (selectedFile: File) => {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        startSimulatedOCR();

        // Auto-fill title based on filename (minus extension)
        const name = selectedFile.name.replace(/\.[^/.]+$/, "");
        setTitle(name.split('_').join(' ').replace(/\b\w/g, l => l.toUpperCase()));
    };

    const startSimulatedOCR = () => {
        setOcrStatus('processing');
        setOcrProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setOcrStatus('completed');
            }
            setOcrProgress(progress);
        }, 300);
    };

    const handleDiscard = () => {
        setFile(null);
        setPreviewUrl(null);
        setOcrStatus('idle');
        setOcrProgress(0);
        setTitle('');
        setDescription('');
    };

    const handleFinalize = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('document_type_code', docType);
            formData.append('created_at', docDate);

            // TODO: Ensure backend endpoint handles this
            await apiClient.post('/documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Documento guardado e indexado exitosamente.');
            navigate('/documents'); // Redirect to explorer
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error al guardar el documento.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-black/5 text-slate-900 dark:text-slate-100 font-display">
            {/* Header is handled by MainLayout if used, but preserving standalone structure for now as per previous file */}

            <main className="flex flex-1 overflow-hidden p-6 gap-6">
                {/* Left Side: Upload / Preview */}
                <div className={`flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-all ${isDragging ? 'ring-4 ring-primary/20 border-primary' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {!file ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-6">
                                <span className="material-symbols-outlined text-[40px]">cloud_upload</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">Arrastra y suelta tu PDF aquí</h3>
                            <p className="text-slate-500 mb-8 max-w-md">Soporta archivos PDF de hasta 20MB. El sistema procesará automáticamente el texto mediante OCR.</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                            >
                                Seleccionar Archivo
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="application/pdf"
                                onChange={handleFileSelect}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate max-w-[300px]">{file.name}</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={handleDiscard} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500" title="Cancelar">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-200 dark:bg-slate-950 p-4 flex justify-center overflow-auto">
                                {previewUrl && (
                                    <iframe
                                        src={previewUrl}
                                        className="w-full h-full max-w-[800px] shadow-2xl rounded-lg bg-white"
                                        title="PDF Preview"
                                    />
                                )}
                            </div>
                        </>
                    )}

                    {/* Drag Overlay */}
                    {isDragging && (
                        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-none">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center animate-bounce-slow">
                                <span className="material-symbols-outlined text-primary text-[48px] mb-2">download</span>
                                <p className="font-bold text-primary">Suelta el archivo para cargar</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Metadata Form */}
                {file && (
                    <div className="w-[400px] flex flex-col gap-6 overflow-y-auto animate-fade-in-right">
                        {/* Progress Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Progreso de Extracción (OCR)</p>
                                <span className={`text-xs font-bold ${ocrStatus === 'completed' ? 'text-green-500' : 'text-primary'}`}>{ocrProgress}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${ocrStatus === 'completed' ? 'bg-green-500' : 'bg-primary'}`}
                                    style={{ width: `${ocrProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                                {ocrStatus === 'completed' ? (
                                    <>
                                        <span className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                                        Extracción completada. Metadatos sugeridos.
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
                                        Procesando texto y detectando tipo...
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className={`bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex-1 transition-opacity duration-500 ${ocrStatus === 'completed' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Indexación de Documento</h3>
                            <form className="space-y-5" onSubmit={handleFinalize}>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tipo Documental</label>
                                    <div className="relative">
                                        <select
                                            value={docType}
                                            onChange={(e) => setDocType(e.target.value)}
                                            className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none"
                                        >
                                            <option value="MEMORANDO">Memorando</option>
                                            <option value="RESOLUCION">Resolución</option>
                                            <option value="CONTRATO">Contrato</option>
                                            <option value="CARTA">Carta</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Título del Documento</label>
                                    <input
                                        className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Descripción / Asunto</label>
                                    <textarea
                                        className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none resize-none"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fecha Documento</label>
                                    <input
                                        className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none"
                                        type="date"
                                        value={docDate}
                                        onChange={(e) => setDocDate(e.target.value)}
                                    />
                                </div>

                                <div className="mt-8 flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        type="button"
                                        onClick={handleDiscard}
                                        className="flex-1 h-11 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                                    >
                                        Descartar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 h-11 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                                    >
                                        Finalizar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
