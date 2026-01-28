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
    ChevronLeft,
    ChevronRight,
    Shield,
    Newspaper,
    Tag,
    BarChart3,
    Wallet,
    UserCog,
    FolderOpen,
    Calendar,
    CheckCircle,
    AlertCircle
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
        { id: 'calendar', label: 'Календарь', icon: Calendar, path: '/lawyer/calendar' },
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
    lawyer: 'from-blue-500 to-blue-600',
    admin: 'from-red-500 to-red-600',
    content_manager: 'from-purple-500 to-purple-600',
    director: 'from-amber-500 to-amber-600',
};

const BackofficeLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [unreadChats, setUnreadChats] = useState(3); // TODO: From WebSocket

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
        <div className="min-h-screen bg-depa-bg flex">
            {/* Sidebar with smooth animation */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 256 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="bg-depa-dark border-r border-depa-dark flex flex-col fixed h-screen z-40"
            >
                {/* Logo with smooth morphing animation */}
                <div className="p-4 border-b border-depa-muted/20 flex items-center justify-center min-h-[68px]">
                    <Link to="/" className="block">
                        <Logo collapsed={collapsed} light />
                    </Link>
                </div>

                {/* Role Badge with animation */}
                <motion.div
                    layout
                    className={`mx-4 mt-4 py-2 rounded-xl bg-gradient-to-r ${roleColor} text-white text-center overflow-hidden ${collapsed ? 'mx-2 px-2' : 'px-3'}`}
                >
                    <AnimatePresence mode="wait">
                        {collapsed ? (
                            <motion.div
                                key="icon"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <Shield size={18} className="mx-auto" />
                            </motion.div>
                        ) : (
                            <motion.span
                                key="text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm font-medium whitespace-nowrap"
                            >
                                {roleTitle}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === `/${userRole}` || item.path === '/lawyer' || item.path === '/admin' || item.path === '/cms' || item.path === '/director'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 relative ${isActive
                                    ? 'text-white'
                                    : 'text-depa-light hover:bg-depa-muted/10'
                                } ${collapsed ? 'justify-center' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Animated background pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-depa-brand rounded-xl shadow-lg"
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 35,
                                                mass: 1
                                            }}
                                        />
                                    )}

                                    {/* Icon and text */}
                                    <span className="relative z-10 flex items-center gap-3">
                                        <item.icon size={20} />
                                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </span>

                                    {/* Badge */}
                                    {item.badge && unreadChats > 0 && (
                                        <span className={`relative z-10 ${collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full px-1.5`}>
                                            {unreadChats}
                                        </span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User & Logout */}
                <div className="p-4 border-t border-depa-muted/20">
                    <div className={`flex items-center gap-3 mb-3 ${collapsed ? 'justify-center' : ''}`}>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColor} flex items-center justify-center text-white font-bold text-sm`}>
                            {getUserInitials()}
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                    {user?.first_name} {user?.last_name}
                                </p>
                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                        )}
                    </div>

                    {/* Collapse Toggle */}
                    <motion.button
                        onClick={() => setCollapsed(!collapsed)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-depa-light hover:bg-depa-muted/10 rounded-xl transition-colors mb-2 ${collapsed ? 'justify-center' : ''}`}
                    >
                        <motion.div
                            animate={{ rotate: collapsed ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.div>
                        {!collapsed && <span className="text-sm font-medium">Свернуть</span>}
                    </motion.button>

                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-depa-light hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors ${collapsed ? 'justify-center' : ''}`}
                    >
                        <LogOut size={20} />
                        {!collapsed && <span className="text-sm font-medium">Выйти</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 ${collapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-depa-bg/80 backdrop-blur-md border-b border-slate-200/50 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                {roleTitle}
                            </h1>
                            <p className="text-slate-500 text-sm">
                                {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                <Bell size={20} className="text-slate-500" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content with Animation */}
                <div className="p-6 pb-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default BackofficeLayout;
