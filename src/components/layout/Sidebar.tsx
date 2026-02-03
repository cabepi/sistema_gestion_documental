import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const Sidebar: React.FC = () => {
    const navItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
        { name: 'Inbox', icon: 'move_to_inbox', path: '/inbox' },
        { name: 'Documentos', icon: 'description', path: '/documents' },
        { name: 'Flujos de Trabajo', icon: 'account_tree', path: '/workflows' },
        { name: 'Reportes', icon: 'analytics', path: '/reports' },
    ];

    const adminItems = [
        { name: 'Configuración', icon: 'settings', path: '/settings' },
        { name: 'Seguridad', icon: 'shield_person', path: '/admin/permissions' },
    ];

    return (
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="size-8 bg-institutional-navy rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                    <h1 className="text-institutional-navy dark:text-primary font-bold text-lg leading-tight">MiCultura</h1>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">SGD Panamá</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                            isActive
                                ? "bg-primary/10 text-institutional-navy dark:text-primary font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm">{item.name}</span>
                    </NavLink>
                ))}

                <div className="pt-4 pb-2">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administración</p>
                </div>

                {adminItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                            isActive
                                ? "bg-primary/10 text-institutional-navy dark:text-primary font-semibold"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full flex items-center justify-center gap-2 bg-institutional-navy text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-institutional-navy/90 transition-all shadow-sm shadow-institutional-navy/20">
                    <span className="material-symbols-outlined !text-[18px]">add_circle</span>
                    Nuevo Documento
                </button>
            </div>
        </aside>
    );
};
