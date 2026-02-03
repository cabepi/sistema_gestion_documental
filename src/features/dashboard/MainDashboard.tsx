
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../api/client';
import { useNavigate } from 'react-router-dom';

interface DashboardMetrics {
    totalDocuments: number;
    pendingDocuments: number;
    newUploads: number;
    completedToday: number;
}

interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
    due_date: string;
    department: string;
    sender: string;
    doc_title: string;
    doc_date: string;
}

export const MainDashboard: React.FC = () => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [metricsRes, tasksRes] = await Promise.all([
                    apiClient.get('/dashboard/metrics'),
                    apiClient.get('/dashboard/tasks')
                ]);
                setMetrics(metricsRes.data);
                setTasks(tasksRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div></div>;
    }

    return (
        <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Panel de Control General</h2>
                    <p className="text-slate-500 text-sm mt-1">Bienvenido al Sistema de Gestión Documental del Ministerio de Cultura.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center">
                        <span className="material-symbols-outlined align-middle mr-1 !text-[18px]">calendar_today</span>
                        Hoy: {new Date().toLocaleDateString('es-PA', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <span className="material-symbols-outlined">folder_open</span>
                        </div>
                        <span className="text-green-600 text-xs font-bold flex items-center">Updates Live <span className="material-symbols-outlined !text-sm">sync</span></span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Documentos</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics?.totalDocuments?.toLocaleString() || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="size-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                        <span className="text-amber-600 text-xs font-bold flex items-center">Requieren Acción</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">En Revisión</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics?.pendingDocuments || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <span className="material-symbols-outlined">upload_file</span>
                        </div>
                        <span className="text-slate-400 text-xs font-medium">Últimos 7 días</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Nuevas Cargas</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics?.newUploads || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="size-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined">task_alt</span>
                        </div>
                        <span className="text-green-600 text-xs font-bold">Completados</span>
                    </div>
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Finalizados hoy</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics?.completedToday || 0}</p>
                    </div>
                </div>
            </div>

            {/* Inbox Section */}
            <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bandeja de Tareas</h3>
                        <p className="text-slate-500 text-xs mt-1">Tareas asignadas y documentos pendientes.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <span className="material-symbols-outlined">refresh</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Documento / Tarea</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Departamento</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fecha Límite</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Prioridad</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {tasks.map((task) => (
                                <tr key={task.id}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                                    onClick={() => navigate(`/viewer?id=${task.id}`)} // Use task ID mapping logic if doc ID differs
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-institutional-navy">description</span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{task.title}</p>
                                                <p className="text-xs text-slate-500">{task.doc_title || 'Sin documento asociado'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{task.department || 'General'}</span>
                                            <span className="text-[10px] text-slate-400">{task.sender}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {new Date(task.due_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-bold rounded 
                                            ${task.priority === 'HIGH' || task.priority === 'URGENT' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-slate-100 text-slate-600'}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-[10px] font-bold rounded-full bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary font-bold text-xs hover:underline">Gestionar</button>
                                    </td>
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 text-sm">
                                        No tienes tareas pendientes. ¡Buen trabajo!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Footer Support Information */}
            <div className="mt-8 flex flex-col md:flex-row gap-6 items-center justify-between text-slate-400 text-[11px] font-medium uppercase tracking-widest border-t border-slate-200 dark:border-slate-800 pt-6">
                <div className="flex items-center gap-6">
                    <span className="hover:text-slate-600 cursor-pointer">Manual de Usuario</span>
                    <span className="hover:text-slate-600 cursor-pointer">Soporte Técnico</span>
                    <span className="hover:text-slate-600 cursor-pointer">Políticas de Privacidad</span>
                </div>
                <p>© 2023 Ministerio de Cultura de Panamá - Dirección de Tecnología</p>
            </div>
        </div>
    );
};

