import React from 'react';

export const UploadAndIndexing: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-3 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">MiCultura SGD</h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">República de Panamá</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-6 ml-4">
                        <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
                        <a href="#" className="text-primary text-sm font-semibold border-b-2 border-primary py-1">Documents</a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Archive</a>
                        <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Reports</a>
                    </nav>
                </div>
                <div className="flex flex-1 justify-end gap-4 items-center">
                    <div className="relative w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input className="w-full h-10 pl-10 pr-4 rounded-lg border-none bg-slate-100 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Search archives..." type="text" />
                    </div>
                    <button className="size-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold leading-none">Admin User</p>
                            <p className="text-xs text-slate-500">National Archive</p>
                        </div>
                        <div className="bg-primary/20 rounded-full size-10 flex items-center justify-center overflow-hidden border-2 border-primary/30">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0GLodgjgydBwlFGQR5FXSHRas6OnJovFdk7rRiUr8i-Jw47HXSW1z_0Q5HKgmoPTDfS9xFXznbWcHQ8vEANh-2jD9WnXvQdDzaFNN6NfRcbr797uTB5bNUNXKpZbAtRQ5H0skzQJwmwUtQ7mIlNOU0HWZVUGV9y6fYoDx-A-Ee2KraHH5-AXt40k6WEpGLFBjVDo8t6FuaXnAIVWE2_THCyZ38Vw2Id0BXe0lnc6ZcGhK3NNldMj7Hlx7xHxz6Yl1Pduv6g1T8cg" alt="User" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-4 gap-2 shrink-0">
                    <p className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Document Tools</p>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-sm font-medium">Home</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                        <span className="text-sm font-bold">Upload & Indexing</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined">description</span>
                        <span className="text-sm font-medium">Recent Documents</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">System Settings</span>
                    </a>
                    <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Storage Status</p>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-primary h-full w-[65%]"></div>
                        </div>
                        <p className="text-[10px] mt-2 text-slate-500">12.4 GB of 20 GB used</p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
                    {/* Breadcrumbs */}
                    <nav className="px-8 py-3 flex items-center gap-2 text-xs font-medium border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                        <a href="#" className="text-slate-500 hover:text-primary">Documents</a>
                        <span className="material-symbols-outlined text-[14px] text-slate-400">chevron_right</span>
                        <span className="text-slate-900 dark:text-white">OCR Ingestion & Indexing</span>
                    </nav>

                    <div className="flex flex-1 overflow-hidden p-6 gap-6">
                        {/* Left Side: PDF Preview */}
                        <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                    <h3 className="font-bold text-slate-800 dark:text-slate-100">manuscrito_historico_1821.pdf</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"><span className="material-symbols-outlined text-slate-500">zoom_in</span></button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"><span className="material-symbols-outlined text-slate-500">zoom_out</span></button>
                                    <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"><span className="material-symbols-outlined text-slate-500">download</span></button>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-200 dark:bg-slate-950 p-8 flex justify-center overflow-auto">
                                {/* Simulated PDF Page */}
                                <div className="w-full max-w-[600px] h-[842px] bg-white shadow-2xl p-12 relative flex flex-col gap-6">
                                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')]"></div>
                                    <div className="border-b-2 border-slate-900/10 pb-4 text-center">
                                        <p className="font-serif italic text-slate-400">Gobierno de Panamá - Registro Civil</p>
                                    </div>
                                    {/* Content placeholders */}
                                    <div className="space-y-4">
                                        <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                                        <div className="h-4 bg-slate-50 rounded w-full"></div>
                                        <div className="h-4 bg-slate-50 rounded w-full"></div>
                                        <div className="h-4 bg-slate-50 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Metadata Form */}
                        <div className="w-[450px] flex flex-col gap-6 overflow-y-auto">
                            {/* Progress Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">OCR Extraction Progress</p>
                                    <span className="text-xs font-bold text-primary">78%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full w-[78%]"></div>
                                </div>
                                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">sync</span>
                                    Processing text and detecting document type...
                                </p>
                            </div>
                            {/* Form Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Document Indexing</h3>
                                <form className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Document Type</label>
                                        <div className="relative">
                                            <select className="w-full h-11 pl-4 pr-10 appearance-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none">
                                                <option>Historical Manuscript</option>
                                                <option>Official Decree</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Document Title</label>
                                        <input className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none" type="text" defaultValue="Manuscrito de Independencia 1821" />
                                    </div>
                                    {/* More inputs... */}
                                </form>
                                <div className="mt-8 flex gap-3">
                                    <button className="flex-1 h-11 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 transition-colors">Discard</button>
                                    <button className="flex-1 h-11 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Finalize Indexing</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
