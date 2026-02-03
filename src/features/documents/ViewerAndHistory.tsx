import React from 'react';

export const ViewerAndHistory: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111718] dark:text-white min-h-screen flex flex-col font-display">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#2a3c3f] bg-white dark:bg-[#111718] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#111718] dark:text-white">
                        <div className="size-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">account_balance</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[#111718] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">MiCultura SGD</h2>
                            <span className="text-[10px] uppercase tracking-wider text-[#618389]">Ministerio de Cultura de Panamá</span>
                        </div>
                    </div>
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-[#618389] flex border-none bg-[#f0f4f4] dark:bg-[#1a2e31] items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111718] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f0f4f4] dark:bg-[#1a2e31] focus:border-none h-full placeholder:text-[#618389] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal" placeholder="Buscar expedientes..." />
                        </div>
                    </label>
                </div>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <nav className="flex items-center gap-8">
                        <a href="#" className="text-[#111718] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors">Documentos</a>
                        <a href="#" className="text-[#111718] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors">Bandeja de Entrada</a>
                        {/* ... */}
                    </nav>
                    <div className="h-6 w-px bg-[#e5e7eb] dark:border-[#2a3c3f]"></div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#111718] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-all">
                        <span className="truncate font-display">M. Arango</span>
                    </button>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCitToaYvzDzFFTIubdwhMP2JzcDiSbln318e3DUCN6cJUM-hrE320f6AwLuCYbirPz-mWlrA-edGgH8aHGhdacazTWPMS6d7X9TjlzDPcnu8FWz-U87asKkZcwwBpxqXFgYEBzvh7zG05tdB28aytFein686So4FkmiCl6ebGd87AOGKLJra86adMrzrPEVeaAIb9XyBb1zVMfrkx7C8BE-2iBp7YLuSI0bkSsUkuczBuOdf5EGg1hS39-zw3zHolrbWKZa1nKCs')" }}></div>
                </div>
            </header>

            {/* Subheader Action Bar */}
            <div className="bg-white dark:bg-[#111718] border-b border-[#e5e7eb] dark:border-[#2a3c3f] px-10 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#618389] text-sm">
                        <a href="#" className="hover:text-primary">Inicio</a>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <a href="#" className="hover:text-primary">Patrimonio Histórico</a>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-[#111718] dark:text-white font-medium">PH-2024-EXP-088.pdf</span>
                    </div>
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Borrador</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-500 border border-red-200 hover:bg-red-50 transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">cancel</span>
                        Rechazar
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-[#111718] hover:bg-opacity-90 transition-all text-sm font-bold">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Aprobar Documento
                    </button>
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
                                <h3 className="font-bold text-[#111718] dark:text-white">PH-2024-EXP-088.pdf</h3>
                            </div>
                        </div>
                        {/* Canvas Placeholder */}
                        <div className="flex-1 bg-gray-200 dark:bg-gray-900 m-8 rounded border-dashed border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                            <div className="relative w-[500px] h-[700px] bg-white shadow-2xl p-12">
                                {/* Document Content */}
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
                                    </div>
                                    <div className="text-right text-[10px] text-gray-400 uppercase tracking-widest">República de Panamá<br />Ministerio de Cultura</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 bg-gray-100 w-full"></div>
                                    <div className="h-3 bg-gray-100 w-full"></div>
                                    <div className="h-3 bg-gray-100 w-2/3"></div>
                                </div>
                            </div>
                        </div>
                        {/* Collaboration Section ... */}
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-[400px] border-l border-[#e5e7eb] dark:border-[#2a3c3f] bg-white dark:bg-[#111718] flex flex-col">
                    <div className="flex border-b border-[#e5e7eb] dark:border-[#2a3c3f] px-4 pt-4">
                        <button className="flex-1 pb-3 text-sm font-medium border-b-2 border-primary text-[#111718] dark:text-white">Detalles</button>
                        <button className="flex-1 pb-3 text-sm font-medium border-b-2 border-transparent text-[#618389]">Historial</button>
                        <button className="flex-1 pb-3 text-sm font-medium border-b-2 border-transparent text-[#618389]">Auditoría</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                        <section>
                            <h4 className="font-bold text-sm uppercase tracking-wider text-[#618389] mb-4">Metadatos</h4>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[#618389] mb-1">Tipo de Documento</p>
                                    <p className="text-sm font-medium">Resolución Administrativa</p>
                                </div>
                                {/* ... */}
                            </div>
                        </section>
                    </div>
                </aside>
            </main>
        </div>
    );
};
