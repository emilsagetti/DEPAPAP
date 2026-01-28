import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Folder, CreditCard, Settings, LogOut, Bell, Search, X, FileText, HelpCircle, User, Clock, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

// Search suggestions data
const searchSuggestions = [
    { id: 1, icon: FileText, label: 'Новый договор', description: 'Создать новый документ', path: '/dashboard/documents' },
    { id: 2, icon: MessageSquare, label: 'Чат с юристом', description: 'Начать консультацию', path: '/dashboard/chat' },
    { id: 3, icon: CreditCard, label: 'Оплата и подписка', description: 'Управление тарифом', path: '/dashboard/billing' },
    { id: 4, icon: User, label: 'Настройки профиля', description: 'Изменить данные', path: '/dashboard/settings' },
    { id: 5, icon: HelpCircle, label: 'Помощь', description: 'Часто задаваемые вопросы', path: '/dashboard' },
    { id: 6, icon: Folder, label: 'Мои документы', description: 'Все загруженные файлы', path: '/dashboard/documents' },
];

const recentSearches = [
    'Регистрация ООО',
    'Договор аренды',
    'Консультация юриста'
];

// Notifications data
const notificationsData = [
    { id: 1, title: 'Новый документ', message: 'Договор аренды готов к подписанию', time: '5 мин назад', unread: true },
    { id: 2, title: 'Сообщение от юриста', message: 'Анна Сергеева ответила на ваш вопрос', time: '1 час назад', unread: true },
    { id: 3, title: 'Оплата прошла', message: 'Подписка успешно продлена', time: 'Вчера', unread: false },
];

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const searchInputRef = useRef(null);
    const notificationsRef = useRef(null);
    const profileRef = useRef(null);

    const menuItems = [
        { id: 'dashboard', label: 'Рабочий стол', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'chat', label: 'Чат с юристом', icon: MessageSquare, path: '/dashboard/chat' },
        { id: 'docs', label: 'Документы', icon: Folder, path: '/dashboard/documents' },
        { id: 'billing', label: 'Оплата', icon: CreditCard, path: '/dashboard/billing' },
        { id: 'settings', label: 'Настройки', icon: Settings, path: '/dashboard/settings' },
    ];

    // Get current date in Russian
    const today = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    // Get user display name
    const getUserDisplayName = () => {
        if (user?.first_name) {
            return user.first_name;
        }
        if (user?.email) {
            return user.email.split('@')[0];
        }
        return 'Пользователь';
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
        }
        if (user?.first_name) {
            return user.first_name[0].toUpperCase();
        }
        if (user?.email) {
            return user.email[0].toUpperCase();
        }
        return 'U';
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    // Filter suggestions based on query
    const filteredSuggestions = searchQuery.trim()
        ? searchSuggestions.filter(s =>
            s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : searchSuggestions;

    // Handle search item click
    const handleSearchSelect = (path) => {
        setSearchOpen(false);
        setSearchQuery('');
        navigate(path);
    };

    // Focus input when search opens
    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setNotificationsOpen(false);
                setProfileOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setNotificationsOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-depa-bg text-depa-dark flex font-sans">

            {/* Desktop Sidebar */}
            <aside className="glass-card w-64 fixed h-screen z-40 hidden lg:flex flex-col m-0 rounded-none border-t-0 border-b-0 border-l-0">
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="block">
                        <Logo />
                    </Link>
                </div>

                <nav className="flex-1 mt-4 px-3 space-y-1">
                    <LayoutGroup>
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className="relative w-full flex items-center min-h-[48px] p-3 rounded-xl transition-colors block"
                            >
                                {({ isActive }) => (
                                    <>
                                        {/* Sliding Pill Background */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 bg-depa-brand/20 rounded-xl z-0"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 30,
                                                    mass: 1
                                                }}
                                            />
                                        )}

                                        {/* Active Indicator Bar */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-indicator"
                                                className="absolute left-0 w-1.5 bg-depa-cta rounded-r-lg h-6 top-0 bottom-0 my-auto z-20"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 350,
                                                    damping: 30,
                                                    mass: 1
                                                }}
                                            />
                                        )}

                                        {/* Content */}
                                        <span className={`relative z-10 flex items-center gap-3 font-medium transition-colors ${isActive ? 'text-depa-brand' : 'text-depa-muted hover:text-depa-dark'
                                            }`}>
                                            <item.icon size={20} className={isActive ? 'text-depa-cta' : 'text-depa-light'} />
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </LayoutGroup>
                </nav>

                <div className="p-4 border-t border-white/10 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-depa-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Выйти</span>
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 bottom-0 w-72 bg-white/90 backdrop-blur-xl z-50 lg:hidden flex flex-col shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <Link to="/" onClick={() => setSidebarOpen(false)}>
                                    <Logo />
                                </Link>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-1 text-depa-muted hover:text-depa-dark rounded-lg"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        end={item.path === '/dashboard'}
                                        onClick={() => setSidebarOpen(false)}
                                        className={({ isActive }) => `
                                            relative w-full flex items-center min-h-[48px] p-3 rounded-xl transition-colors
                                            ${isActive ? 'bg-depa-brand/10 text-depa-brand' : 'text-depa-muted hover:text-depa-dark hover:bg-white/50'}
                                        `}
                                    >
                                        <item.icon size={20} className="text-depa-muted mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            <div className="p-4 border-t border-white/10 mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-depa-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span className="font-medium">Выйти</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 ml-0 lg:ml-64 min-h-screen transition-all duration-300">
                {/* Top Header */}
                <header className="glass-panel-light sticky top-0 z-30 px-4 md:px-8 py-3 md:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <Menu size={24} />
                            </button>

                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-slate-900 line-clamp-1">
                                    Добрый день, {getUserDisplayName()} 👋
                                </h1>
                                <p className="text-slate-500 text-xs md:text-sm capitalize hidden xs:block">{today}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Search Button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="flex items-center gap-2 pl-3 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-400 hover:border-depa-cta hover:text-slate-600 transition-colors md:w-64 w-10 md:justify-start justify-center"
                            >
                                <Search size={18} />
                                <span className="hidden md:inline">Поиск...</span>
                                <kbd className="hidden md:inline ml-auto text-xs bg-slate-100 px-1.5 py-0.5 rounded">⌘K</kbd>
                            </button>

                            {/* Notifications */}
                            <div className="relative" ref={notificationsRef}>
                                <button
                                    onClick={() => {
                                        setNotificationsOpen(!notificationsOpen);
                                        setProfileOpen(false);
                                    }}
                                    className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <Bell size={20} className="text-slate-500" />
                                    {notificationsData.some(n => n.unread) && (
                                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {notificationsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                                        >
                                            <div className="p-4 border-b border-slate-100">
                                                <h3 className="font-semibold text-slate-900">Уведомления</h3>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notificationsData.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        className={`p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors ${notif.unread ? 'bg-depa-brand/10' : ''}`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-depa-cta' : 'bg-transparent'}`} />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm text-slate-900">{notif.title}</p>
                                                                <p className="text-sm text-slate-500 truncate">{notif.message}</p>
                                                                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-slate-100">
                                                <button className="w-full text-center text-sm text-depa-cta hover:text-blue-700 font-medium">
                                                    Показать все
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile */}
                            <div className="relative" ref={profileRef}>
                                <div
                                    onClick={() => {
                                        setProfileOpen(!profileOpen);
                                        setNotificationsOpen(false);
                                    }}
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-depa-brand to-depa-dark border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:scale-105 transition-transform"
                                    title={user?.email}
                                >
                                    {getUserInitials()}
                                </div>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                                        >
                                            <div className="p-4 border-b border-slate-100">
                                                <p className="font-semibold text-slate-900">{getUserDisplayName()}</p>
                                                <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <button
                                                    onClick={() => { navigate('/dashboard/settings'); setProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                                                >
                                                    <User size={18} className="text-slate-400" />
                                                    Настройки профиля
                                                </button>
                                                <button
                                                    onClick={() => { navigate('/dashboard/billing'); setProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                                                >
                                                    <CreditCard size={18} className="text-slate-400" />
                                                    Подписка и оплата
                                                </button>
                                            </div>
                                            <div className="p-2 border-t border-slate-100">
                                                <button
                                                    onClick={() => { handleLogout(); setProfileOpen(false); }}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                                >
                                                    <LogOut size={18} />
                                                    Выйти
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6 pb-8 overflow-x-hidden">
                    <Outlet />
                </div>
            </main>

            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSearchOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Search Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                                    <Search size={22} className="text-slate-400" />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Поиск по приложению..."
                                        className="flex-1 text-lg outline-none placeholder:text-slate-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="p-1 hover:bg-slate-100 rounded-lg"
                                        >
                                            <X size={18} className="text-slate-400" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setSearchOpen(false)}
                                        className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded"
                                    >
                                        ESC
                                    </button>
                                </div>

                                {/* Results */}
                                <div className="max-h-[400px] overflow-y-auto">
                                    {/* Recent Searches (only show when no query) */}
                                    {!searchQuery.trim() && (
                                        <div className="p-4 border-b border-slate-100">
                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                                Недавние поиски
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {recentSearches.map((term, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSearchQuery(term)}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors"
                                                    >
                                                        <Clock size={14} />
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Suggestions */}
                                    <div className="p-4">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                            {searchQuery.trim() ? 'Результаты' : 'Быстрые действия'}
                                        </p>

                                        {filteredSuggestions.length > 0 ? (
                                            <div className="space-y-1">
                                                {filteredSuggestions.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => handleSearchSelect(item.path)}
                                                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-depa-brand/10 transition-colors group text-left"
                                                    >
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-depa-brand/20 flex items-center justify-center transition-colors">
                                                            <item.icon size={20} className="text-slate-500 group-hover:text-depa-cta" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-800 group-hover:text-depa-cta">{item.label}</p>
                                                            <p className="text-sm text-slate-400">{item.description}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Search size={40} className="mx-auto text-slate-300 mb-3" />
                                                <p className="text-slate-500">Ничего не найдено</p>
                                                <p className="text-sm text-slate-400">Попробуйте другой запрос</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardLayout;
