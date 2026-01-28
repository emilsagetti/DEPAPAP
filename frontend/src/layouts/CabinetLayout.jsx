import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    CreditCard,
    LogOut,
    User,
    Menu,
    Shield,
    Briefcase,
    LifeBuoy,
    Lock,
    X,
    Bot,          // AI Assistant
    FileEdit,     // Constructor
    BookOpen,     // Research
    Database,     // Vault
    GitBranch,    // Workflows
    Cpu           // Alternative for tools
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const CabinetLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Mock subscription status check
    const isSubscribed = user?.subscription_status === 'active';

    // New Menu Structure
    const menuItems = [
        // Main
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/cabinet', locked: false },
        { id: 'assistant', label: 'AI Ассистент', icon: Bot, path: '/cabinet/assistant', locked: !isSubscribed, badge: 'AI' },

        // Tools
        { id: 'constructor', label: 'Конструктор', icon: FileEdit, path: '/cabinet/constructor', locked: !isSubscribed },
        { id: 'vault', label: 'Хранилище', icon: Database, path: '/cabinet/vault', locked: !isSubscribed }, // Was 'docs'
        { id: 'research', label: 'База знаний', icon: BookOpen, path: '/cabinet/research', locked: !isSubscribed },
        { id: 'workflows', label: 'Процессы', icon: GitBranch, path: '/cabinet/workflows', locked: !isSubscribed, badge: 'Beta' },

        // Service
        { id: 'services', label: 'Услуги и заявки', icon: Briefcase, path: '/cabinet/services', locked: false },
        { id: 'billing', label: 'Финансы', icon: CreditCard, path: '/cabinet/billing', locked: !isSubscribed },
        { id: 'tariff', label: 'Тариф и подписка', icon: Shield, path: '/cabinet/tariff', locked: false },
        { id: 'support', label: 'Поддержка', icon: LifeBuoy, path: '/cabinet/support', locked: false },
    ];

    const getUserDisplayName = () => user?.first_name || user?.email?.split('@')[0] || 'Пользователь';
    const getUserInitials = () => {
        if (user?.first_name && user?.last_name) return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        return (user?.email?.[0] || 'U').toUpperCase();
    };

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    // Subscription guard: redirect to tariff page if no subscription
    useEffect(() => {
        if (!user) return; // Wait for user to load

        const currentPath = window.location.pathname;
        const whitelist = ['/cabinet', '/cabinet/tariff', '/cabinet/support', '/cabinet/services', '/cabinet/profile', '/cabinet/security'];

        // Only redirect if explicitly accessing a locked tool AND no subscription
        // We iterate menuItems to check if current path is locked
        const currentItem = menuItems.find(item => item.path === currentPath);

        if (currentItem && currentItem.locked && !isSubscribed) {
            console.log('[CABINET] Access denied to locked feature, redirecting to tariff');
            navigate('/cabinet/tariff', { replace: true });
        }
    }, [isSubscribed, user, navigate]);

    return (
        <div className="min-h-screen relative font-sans text-white animate-fade-in bg-[#050B14]">
            {/* Mesh Background */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute inset-0 bg-[#050B14]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-depa-cta/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-72 z-40 hidden lg:flex flex-col bg-[#050B14]/80 backdrop-blur-2xl border-r border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out hover:w-[19rem] group/sidebar">
                <div className="p-8 border-b border-white/5 flex items-center gap-3 relative overflow-hidden group/header">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/10 to-transparent opacity-0 group-hover/header:opacity-100 transition-opacity duration-500"></div>
                    <Link to="/" className="block relative group">
                        <div className="absolute -inset-4 bg-[#06B6D4]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Logo light asLink={false} className="relative z-10" />
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={item.id}
                            to={item.locked ? '#' : item.path}
                            onClick={(e) => {
                                if (item.locked) {
                                    e.preventDefault();
                                    navigate('/cabinet/tariff');
                                }
                            }}
                            end={item.path === '/cabinet'}
                            className={({ isActive }) => `
                                relative group flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 w-full mb-1.5 animate-slide-up overflow-hidden
                                ${isActive && !item.locked
                                    ? 'bg-gradient-to-r from-[#06B6D4]/15 to-transparent shadow-[inset_3px_0_0_0_#06B6D4]'
                                    : 'hover:bg-white/5'}
                                ${item.locked ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && !item.locked && (
                                        <div className="absolute inset-0 bg-[#06B6D4]/5 rounded-2xl animate-pulse-slow"></div>
                                    )}
                                    <div className={`mr-4 shrink-0 transition-all duration-300 relative z-10 p-1.5 rounded-xl ${isActive ? 'bg-[#06B6D4]/20 text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'text-white/50 group-hover:text-white group-hover:bg-white/10'}`}>
                                        <item.icon size={20} className={isActive ? 'scale-105' : 'group-hover:scale-110 transition-transform'} />
                                    </div>
                                    <span className={`font-medium tracking-wide text-sm relative z-10 transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                        {item.label}
                                    </span>

                                    {/* Badge */}
                                    {item.badge && !item.locked && (
                                        <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#06B6D4] text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                                            {item.badge}
                                        </span>
                                    )}

                                    {item.locked && (
                                        <Lock size={14} className="ml-auto text-white/20" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                <div className="p-4 border-t border-white/5 bg-gradient-to-b from-transparent to-black/40 backdrop-blur-md">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 text-white/50 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/10 group active:scale-[0.98]"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-300 opacity-70 group-hover:opacity-100" />
                        <span className="font-medium text-sm">Выйти</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 bottom-0 w-80 bg-[#050B14] z-50 lg:hidden flex flex-col shadow-2xl border-r border-white/10"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <Link to="/" onClick={() => setSidebarOpen(false)}>
                                    <Logo asLink={false} />
                                </Link>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-2.5 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-all active:scale-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                                {menuItems.map((item, index) => (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        end={item.path === '/cabinet'}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) => `
                                            relative group flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 w-full mb-1.5 animate-slide-up overflow-hidden
                                            ${isActive
                                                ? 'bg-gradient-to-r from-[#06B6D4]/15 to-transparent shadow-[inset_3px_0_0_0_#06B6D4]'
                                                : 'hover:bg-white/5'}
                                        `}
                                    >
                                        <div className={`mr-4 shrink-0 transition-all duration-300 relative z-10 p-1.5 rounded-xl text-white/50 group-hover:text-white group-hover:bg-white/10`}>
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-medium tracking-wide text-sm relative z-10 text-white/60 group-hover:text-white">
                                            {item.label}
                                        </span>
                                    </NavLink>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 ml-0 lg:ml-72 min-h-screen transition-all duration-300 relative z-10">
                <header className="glass-panel sticky top-0 z-30 px-4 md:px-8 py-3 md:py-4 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-white/60 hover:bg-white/10 rounded-xl transition-colors">
                                <Menu size={24} />
                            </button>
                            <h1 className="text-lg md:text-xl font-bold text-white line-clamp-1 animate-fade-in">
                                Кабинет DEPA
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-premium font-medium text-sm hover:scale-105 active:scale-95"
                            >
                                <LogOut size={16} className="rotate-180" />
                                <span>На сайт</span>
                            </button>

                            <div className="relative" ref={profileRef}>
                                <div onClick={() => setProfileOpen(!profileOpen)} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 text-white flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-white/10 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-premium hover:scale-105 active:scale-95">
                                    {getUserInitials()}
                                </div>
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            className="absolute right-0 mt-3 w-56 rounded-glass border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/5">
                                                <p className="font-semibold text-sm text-white">{getUserDisplayName()}</p>
                                            </div>
                                            <Link to="/cabinet/security" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                                                <Shield size={16} /> Безопасность
                                            </Link>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-white/5">
                                                <LogOut size={16} /> Выйти из аккаунта
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 pb-8 overflow-x-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <Outlet />
                </div>
            </main>
        </div >
    );
};

export default CabinetLayout;
