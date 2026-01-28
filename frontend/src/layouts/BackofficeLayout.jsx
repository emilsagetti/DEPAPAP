import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    FileText,
    Settings,
    LogOut,
    Bell,
    CheckCircle,
    AlertCircle,
    Newspaper,
    Tag,
    BarChart3,
    Wallet,
    UserCog,
    FolderOpen,
    Calendar,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

// Menu items for each role
const roleMenus = {
    lawyer: [
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/lawyer' },
        { id: 'chats', label: 'Чаты', icon: MessageSquare, path: '/lawyer/chats', badge: true },
        { id: 'clients', label: 'Мои клиенты', icon: Users, path: '/lawyer/clients' },
        { id: 'documents', label: 'Документы', icon: FolderOpen, path: '/lawyer/documents' },
        { id: 'planner', label: 'Планировщик', icon: Calendar, path: '/lawyer/planner' },
        { id: 'settings', label: 'Настройки', icon: Settings, path: '/lawyer/settings' },
    ],
    admin: [
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/admin' },
        { id: 'users', label: 'Пользователи', icon: Users, path: '/admin/users' },
        { id: 'lawyers', label: 'Верификация', icon: CheckCircle, path: '/admin/lawyers', badge: true },
        { id: 'reports', label: 'Жалобы', icon: AlertCircle, path: '/admin/reports' },
        { id: 'logs', label: 'Логи', icon: FileText, path: '/admin/logs' },
        { id: 'settings', label: 'Настройки', icon: Settings, path: '/admin/settings' },
    ],
    content_manager: [
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/cms' },
        { id: 'news', label: 'Новости', icon: Newspaper, path: '/cms/news' },
        { id: 'tariffs', label: 'Тарифы', icon: Tag, path: '/cms/tariffs' },
        { id: 'services', label: 'Услуги', icon: FileText, path: '/cms/services' },
        { id: 'pages', label: 'Страницы', icon: FolderOpen, path: '/cms/pages' },
        { id: 'settings', label: 'Настройки', icon: Settings, path: '/cms/settings' },
    ],
    director: [
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/director' },
        { id: 'analytics', label: 'Аналитика', icon: BarChart3, path: '/director/analytics' },
        { id: 'finance', label: 'Финансы', icon: Wallet, path: '/director/finance' },
        { id: 'team', label: 'Команда', icon: UserCog, path: '/director/team' },
        { id: 'lawyer', label: 'Юристы', icon: MessageSquare, path: '/lawyer' },
        { id: 'admin', label: 'Админка', icon: Shield, path: '/admin' },
        { id: 'cms', label: 'CMS', icon: Newspaper, path: '/cms' },
        { id: 'settings', label: 'Настройки', icon: Settings, path: '/director/settings' },
    ],
};

const roleTitles = {
    lawyer: 'Панель юриста',
    admin: 'Администрирование',
    content_manager: 'Управление контентом',
    director: 'Панель руководителя',
};

const roleColors = {
    lawyer: 'from-blue-500 to-cyan-500',
    admin: 'from-red-500 to-red-600',
    content_manager: 'from-purple-500 to-pink-500',
    director: 'from-amber-400 to-orange-500',
};

const BackofficeLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadChats, setUnreadChats] = useState(3);

    const userRole = user?.role || 'lawyer';
    const menuItems = roleMenus[userRole] || roleMenus.lawyer;
    const roleTitle = roleTitles[userRole] || 'Backoffice';
    const roleColor = roleColors[userRole] || roleColors.lawyer;

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const getUserInitials = () => {
        const first = user?.first_name?.[0] || '';
        const last = user?.last_name?.[0] || '';
        return (first + last).toUpperCase() || 'U';
    };

    return (
        <div className="min-h-screen bg-[#050B14] flex text-slate-300 font-sans selection:bg-cyan-500/30">
            {/* AMBIENT GLOW - Deeper and smoother */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[150px] opacity-40 pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] opacity-40 pointer-events-none" />
            </div>

            {/* SIDEBAR - Fixed width, premium glass */}
            <aside
                className="relative z-50 w-[280px] h-screen flex flex-col border-r border-white/5 bg-[#0F172A]/60 backdrop-blur-2xl shadow-[5px_0_30px_rgba(0,0,0,0.2)]"
            >
                {/* Logo Area */}
                <div className="h-24 flex items-center justify-center border-b border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
                    <Link to="/" className="relative z-10 block transform-gpu hover:scale-105 transition-transform duration-300">
                        <Logo light asLink={false} />
                    </Link>
                </div>

                {/* Role Badge - Stylish Card */}
                <div className="px-5 mt-6 mb-2">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${roleColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${roleColor} animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]`} />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                                {roleTitle}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === `/${userRole}` || item.path === '/lawyer' || item.path === '/admin' || item.path === '/cms' || item.path === '/director'}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${isActive
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/10 to-transparent border-l-[3px] border-[#06B6D4]"
                                            initial={false}
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <item.icon
                                            size={20}
                                            className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-[#06B6D4] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'group-hover:text-white'
                                                }`}
                                        />
                                    </motion.div>
                                    <span className="relative z-10 text-[15px] font-medium tracking-wide">
                                        {item.label}
                                    </span>

                                    {/* Unread Badge */}
                                    {item.badge && unreadChats > 0 && (
                                        <span className="ml-auto relative z-10 px-2 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                                            {unreadChats}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Actions */}
                <div className="p-5 border-t border-white/5 space-y-4 bg-[#0F172A]/40 backdrop-blur-md">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Выйти</span>
                    </button>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                            {getUserInitials()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate group-hover:text-[#06B6D4] transition-colors">
                                {user?.first_name} {user?.last_name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#050B14] relative">
                {/* Header - Glassmorphic & Sticky */}
                <header className="h-24 flex items-center justify-between px-8 border-b border-white/5 relative z-20 bg-[#050B14]/80 backdrop-blur-md transition-all duration-300">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-2xl font-bold text-white tracking-tight"
                        >
                            {roleTitle}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-sm font-medium mt-1"
                        >
                            {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </motion.p>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 transition-colors"
                        >
                            <Bell size={20} />
                            <span className="absolute top-3 right-3.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse"></span>
                        </motion.button>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10 custom-scrollbar-page">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.99 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default BackofficeLayout;
