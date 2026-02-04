import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export const AppLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-custom-dark-bg flex transition-colors duration-300">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-institutional-navy text-white transition-all duration-300 flex flex-col fixed h-full z-20`}>
                <div className="h-16 flex items-center justify-center border-b border-white/10 px-4">
                    {isSidebarOpen ? (
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                            <span className="material-symbols-outlined">account_balance</span>
                            <span>MiCultura SGD</span>
                        </div>
                    ) : (
                        <span className="material-symbols-outlined">account_balance</span>
                    )}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <NavItem to="/dashboard" icon="dashboard" label="Panel General" isOpen={isSidebarOpen} />
                    <NavItem to="/documents" icon="folder_open" label="Documentos" isOpen={isSidebarOpen} />
                    <NavItem to="/upload" icon="cloud_upload" label="Cargar Documento" isOpen={isSidebarOpen} />
                    <NavItem to="/inbox" icon="inbox" label="Bandeja de Entrada" isOpen={isSidebarOpen} badge="3" />
                    <NavItem to="/workflows" icon="schema" label="Flujos de Trabajo" isOpen={isSidebarOpen} />
                    <NavItem to="/reports" icon="bar_chart" label="Reportes" isOpen={isSidebarOpen} />

                    <div className="pt-4 mt-4 border-t border-white/10">
                        <p className={`px-4 text-xs font-semibold text-white/40 mb-2 uppercase tracking-wider ${!isSidebarOpen && 'hidden'}`}>Administración</p>
                        <NavItem to="/admin/users" icon="group" label="Usuarios" isOpen={isSidebarOpen} />
                        <NavItem to="/admin/permissions" icon="lock_person" label="Permisos" isOpen={isSidebarOpen} />
                        <NavItem to="/settings" icon="settings" label="Configuración" isOpen={isSidebarOpen} />
                    </div>
                </nav>

                {/* User Profile Summary */}
                <div className="p-4 border-t border-white/10">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                            JP
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Juan Pérez</p>
                                <p className="text-xs text-white/50 truncate">Administrador</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={handleLogout} className="text-white/50 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="h-16 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 shadow-sm px-6 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-institutional-navy transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="relative hidden md:block w-96">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input
                                type="text"
                                placeholder="Buscar documentos, expedientes o personas..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-dark/20 focus:bg-white transition-all dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-institutional-navy transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                        {/* Mobile Search Toggle */}
                        <button className="md:hidden p-2 text-slate-400">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
    isOpen: boolean;
    badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isOpen, badge }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
            }
        >
            <span className="material-symbols-outlined">{icon}</span>
            {isOpen && (
                <div className="flex-1 flex items-center justify-between whitespace-nowrap overflow-hidden">
                    <span className="text-sm font-medium">{label}</span>
                    {badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 rounded-full text-white shadow-sm">
                            {badge}
                        </span>
                    )}
                </div>
            )}
        </NavLink>
    );
};
