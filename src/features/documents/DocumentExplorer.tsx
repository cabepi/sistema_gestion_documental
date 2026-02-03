import React from 'react';

export const DocumentExplorer: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            {/* Filters & Tools */}
            <div className="px-6 py-4 flex items-center justify-between bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-400 mr-2">Filters:</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                        Date Range
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                        Tags
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                        File Type
                        <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <button className="text-primary text-sm font-medium hover:underline">Clear all</button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined">view_list</span>
                    </button>
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined">grid_view</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Filename</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {/* Row 1 */}
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Decree_042_2023_Legal_Framework.pdf</p>
                                            <p className="text-xs text-slate-500">2.4 MB • Legal/Decrees</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 12, 2023</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                                            <img alt="Juan Perez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmIVi_UImnDnJI46PS8jv6Ng0zzGjXI_nENP2sPXj18o6-w8MBcT69LzV5IakyyeALfe7cnikyZkvMyAnsxK5mWnsFPIdDDmaRNQjQDDaHLCVs8fROv4mYYacjkgEbWd62oqlMSLhuPPuRcC6dOWTBk9dIyHBZY3jQzQxAdknRgaqfF8kQuQuPenyDTzvqPBMgZxTh7xST6Hka1sm1_809wQu9vYRpQS76eY5ZWqJdRr969eZugt3MAGqeWej72HFEllBZPdpSp9o" />
                                        </div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Juan Perez</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        Approved
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">share</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* Row 2 */}
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-blue-500">description</span>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Heritage_Site_Restoration_Report.docx</p>
                                            <p className="text-xs text-slate-500">1.1 MB • Heritage Files</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Oct 10, 2023</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                                            <img alt="Maria Santos" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_q-AWXl9cUDhi8yxJQgLlvcahehxxtZAvYHp8jOzBWBU2_V4HNJq2VecEUs_TSwLvDsxfrSXMHWOq1b2F1s3B7aDY2d0_K3xaT3hQyPQ1dHQQew9QkrJ5ve2f1E93eOstYjx1rG-6bf7R_nUmBkp9xAZMuqYVWKbWePs8lDvxqes3zjk1Qeylj4hJlSxlvefIUa64GMfORzTW5NePyaIpzbCsyDexK8q0W77AUhwjNKRma8QzB9143twYXn_gG3tXH1D6ov9P5tM" />
                                        </div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Maria Santos</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                        Draft
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">share</span>
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">10</span> of <span className="font-bold text-slate-900 dark:text-white">152</span> documents</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-400 disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="size-8 bg-primary text-slate-900 rounded-lg text-sm font-bold flex items-center justify-center">1</button>
                        <button className="size-8 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary">2</button>
                        <button className="size-8 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary">3</button>
                        <span className="px-1">...</span>
                        <button className="size-8 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:border-primary">16</button>
                        <button className="px-3 py-1 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
