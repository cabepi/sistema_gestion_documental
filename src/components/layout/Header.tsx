import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="h-16 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10 sticky top-0">
            <div className="flex-1 max-w-xl">
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                        placeholder="Búsqueda avanzada de expedientes o resoluciones..."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Lic. Ricardo Alfaro</p>
                        <p className="text-[10px] text-slate-500 font-medium">Secretaría General</p>
                    </div>
                    <div className="size-10 rounded-full bg-institutional-gold flex items-center justify-center text-white overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                        <img
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVORZkA08sl8ErSqGDzfhV4B_MticoS1G7ukQJK9CneaCrsSwaJiRwYH3j9CBUyRZeZegH0mAidJJ-zjhsU5U5Xt0weHkxf5GSD7sIR0NjE128eCqzReUioesf59pV5lrcZh_lZL2CYJ5XaLQzy4RuFNq7aBHxHpmPJQbczi_qbYfQGButa538Ze2jpoyPrJAEajq_IoAJA5vrtKdIVgi6homjFAhNHssd7Ts77p3TRNJ58Ma0Z3hA37hncgZNkwomYIlV_2o29dc"
                            alt="Profile"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
