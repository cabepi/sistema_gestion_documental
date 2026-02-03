import React from 'react';

export const WorkflowDesigner: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            {/* TopNavBar */}
            <header className="flex items-center justify-between border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 z-20 shrink-0">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">MiCultura SGD</h2>
                            <span className="text-[10px] uppercase tracking-widest text-gold-accent font-bold">Ministerio de Cultura</span>
                        </div>
                    </div>
                </div>
                {/* ... nav ... */}
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar: Toolbox */}
                <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Designer Toolbox</h3>
                        <div className="space-y-2">
                            <div className="group flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 cursor-grab active:cursor-grabbing">
                                <span className="material-symbols-outlined text-primary">add_circle</span>
                                <span className="text-slate-900 dark:text-white text-sm font-medium">Document State</span>
                            </div>
                            {/* ... items ... */}
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col overflow-y-auto">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Workflow Info</h3>
                        {/* ... info ... */}
                    </div>
                </aside>

                {/* Main Canvas Area */}
                <main className="flex-1 flex flex-col relative bg-background-light dark:bg-background-dark overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-10">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Legal Review Process</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-slate-900 text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined text-lg">publish</span>
                                Publish Workflow
                            </button>
                        </div>
                    </div>
                    {/* Canvas Grid */}
                    <div className="flex-1 relative overflow-auto p-12" style={{
                        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                        backgroundSize: "20px 20px"
                    }}>
                        {/* Nodes Diagram Simulated */}
                        <div className="absolute left-20 top-32 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-l-4 border-primary p-4 z-10 ring-2 ring-primary/20">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Document Upload</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Initial submission state for all cultural heritage files.</p>
                        </div>

                        <div className="absolute left-96 top-32 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border-l-4 border-gold-accent p-4 z-10">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Legal Verification</h4>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Properties */}
                <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col z-10">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Logic Rules</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Rules */}
                        <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">If Amount &gt; $5,000</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
