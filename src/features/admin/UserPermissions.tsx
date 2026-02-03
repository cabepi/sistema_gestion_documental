import React from 'react';

export const UserPermissions: React.FC = () => {
    return (
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-background-light dark:bg-background-dark">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">User Permissions</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage roles and granular access for the Ministry of Culture staff.</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all shadow-lg shadow-primary/20">
                    Add New User
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="font-bold text-slate-900 dark:text-white">Ministry Staff</h2>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"><span className="material-symbols-outlined text-lg">filter_list</span></button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"><span className="material-symbols-outlined text-lg">download</span></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-300">CR</div>
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Carlos Ruiz</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">cruiz@micultura.gob.pa</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-semibold">Admin</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold">
                                        <span className="size-1.5 rounded-full bg-emerald-500"></span> Active
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary font-bold text-xs hover:underline">Edit</button>
                                </td>
                            </tr>
                            {/* Other rows suppressed for brevity, will be added if requested or can be added */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Permissions per Folder (Tree Structure) */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Permissions per Folder</h2>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                    {/* Folder permissions matrix extracted from HTML */}
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-400 uppercase">
                            <div className="col-span-6">Department Repository</div>
                            <div className="col-span-2 text-center">Read</div>
                            <div className="col-span-2 text-center">Write</div>
                            <div className="col-span-2 text-center">Delete</div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                    <span className="material-symbols-outlined text-primary/70">folder_open</span>
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">National Heritage</span>
                                </div>
                                <div className="col-span-2 flex justify-center"><input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 transition-all" type="checkbox" /></div>
                                <div className="col-span-2 flex justify-center"><input defaultChecked className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 transition-all" type="checkbox" /></div>
                                <div className="col-span-2 flex justify-center"><input className="rounded border-slate-300 text-primary focus:ring-primary h-5 w-5 transition-all" type="checkbox" /></div>
                            </div>
                        </div>
                        <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <button className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 px-6 rounded-lg text-sm mr-3">Discard Changes</button>
                            <button className="bg-primary text-white font-bold py-2 px-6 rounded-lg text-sm hover:opacity-90 shadow-md">Apply Permissions</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
