
import React, { useState } from 'react';
import { apiClient } from '../../api/client';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token, user } = response.data;

            // Save auth data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Left Panel */}
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-institutional-navy items-end p-12 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBd5daJeTkYiThaPqv7Ewq7_vTNRsSMRw_OOxZXw6XVMAliuhnZdmnKPfcN3kgb_puKUcwQimXBtJtwUVbJTEM33jvafEWN7LmQmXxcfoQgVtoU8X01Vxhko-tQFe_1zK5SAL2Z3YWePlnAI3OpidiPkm417Bw1p7hFcA-h0VMzDCOoqXzC10au4eVZFJftN2yyZYaipkjF5FYdujrBpoyNTrNfvMaozPka-XDasm7PSoBpJz7uvSqUt9gX8vGpc6Q6YL7pZ53LbAA')" }}
                ></div>
                <div className="absolute inset-0 bg-institutional-navy/80 bg-gradient-to-t from-institutional-navy/90 to-institutional-navy/40"></div>
                <div className="relative z-10 text-white max-w-lg">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                            <svg className="text-primary-dark w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">MiCultura SGD</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">Preservando el Patrimonio de Panamá a través de la Excelencia Digital</h1>
                    <p className="text-lg opacity-90 font-light max-w-md">Acceso seguro al Sistema de Gestión Documental oficial del Ministerio de Cultura. Fortaleciendo la administración cultural y la transparencia.</p>
                </div>
                <div className="absolute bottom-6 right-6 text-white/50 text-xs">
                    República de Panamá © 2024
                </div>
            </div>

            {/* Right Panel (Form) */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center p-8 bg-background-light dark:bg-background-dark">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <div className="md:hidden flex justify-center mb-6">
                            <div className="w-16 h-16 bg-primary-dark rounded-xl flex items-center justify-center p-3">
                                <svg className="text-white w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-institutional-navy dark:text-white">Portal de Gestión</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Ingrese sus credenciales para acceder al sistema institucional.</p>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                            <span className="material-symbols-outlined text-primary-dark">account_balance</span>
                            <span className="text-institutional-navy dark:text-white font-semibold">Iniciar sesión con SSO Institucional</span>
                        </button>
                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            <span className="flex-shrink mx-4 text-xs font-medium uppercase tracking-wider text-gray-500">o use su cuenta interna</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 animate-pulse">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Usuario o Correo Institucional</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                                    <input
                                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all dark:text-white"
                                        placeholder="ej. admin@micultura.gob.pa"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Contraseña</label>
                                    <a className="text-xs font-semibold text-primary-dark hover:underline" href="#">¿Olvidó su contraseña?</a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                                    <input
                                        className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all dark:text-white"
                                        placeholder="••••••••"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input id="remember" type="checkbox" className="w-4 h-4 text-primary-dark border-gray-300 rounded focus:ring-primary-dark" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">Recordar este dispositivo</label>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-primary-dark hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-primary-dark/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span>Ingresando...</span>
                                ) : (
                                    <>
                                        <span>Ingresar al Sistema</span>
                                        <span className="material-symbols-outlined text-lg">login</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-primary-dark transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">help</span>
                                Soporte Técnico
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary-dark transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-lg">description</span>
                                Registros Públicos
                            </a>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-800 w-full pt-4 text-center">
                            <p className="text-xs text-gray-400">
                                Ministerio de Cultura de Panamá. Todos los derechos reservados. <br />
                                Este es un sistema seguro. El acceso no autorizado está prohibido.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

