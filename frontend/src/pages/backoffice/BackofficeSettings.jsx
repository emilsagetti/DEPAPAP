import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Bell, Shield, Palette, Globe,
    Mail, Phone, Lock, Eye, EyeOff, Check, X, Loader2, AlertCircle, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../api/services';

const BackofficeSettings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        newChat: true,
        newOrder: true,
        systemNews: false
    });

    const tabs = [
        { id: 'profile', label: 'Профиль', icon: User },
        { id: 'notifications', label: 'Уведомления', icon: Bell },
        { id: 'security', label: 'Безопасность', icon: Shield },
    ];

    // Password change state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handlePasswordChange = async () => {
        setPasswordError('');
        setPasswordSuccess('');

        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setPasswordError('Заполните все поля');
            return;
        }
        if (passwords.new.length < 8) {
            setPasswordError('Новый пароль должен быть не менее 8 символов');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setPasswordError('Пароли не совпадают');
            return;
        }

        setIsChangingPassword(true);
        try {
            await userAPI.changePassword(passwords.current, passwords.new);
            setPasswordSuccess('Пароль успешно изменён');
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (err) {
            if (err.response?.status === 400) {
                setPasswordError('Неверный текущий пароль');
            } else {
                setPasswordError('Ошибка при смене пароля');
            }
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-7xl mx-auto pb-10"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Настройки</h1>
                    <p className="text-slate-400">Управление профилем и параметрами</p>
                </div>
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl"
                    >
                        <Check size={18} />
                        <span className="font-medium">Сохранено</span>
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tabs Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-64 flex-shrink-0"
                >
                    <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors mb-1 last:mb-0"
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="backofficeSettingsTab"
                                        className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className={`relative z-10 flex items-center gap-3 ${activeTab === tab.id ? 'text-[#06B6D4]' : 'text-slate-400 hover:text-white'}`}>
                                    <tab.icon size={18} />
                                    {tab.label}
                                </span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute right-3 text-[#06B6D4]"
                                    >
                                        <ChevronRight size={14} />
                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">Личные данные</h3>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg border-2 border-[#0F172A]">
                                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                                </div>
                                <div>
                                    <button className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all hover:scale-105 active:scale-95 text-sm">
                                        Изменить фото
                                    </button>
                                    <p className="text-xs text-slate-500 mt-2">JPG или PNG, максимум 5MB</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Имя</label>
                                    <input
                                        type="text"
                                        value={profile.firstName}
                                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Фамилия</label>
                                    <input
                                        type="text"
                                        value={profile.lastName}
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Телефон</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full pl-11 pr-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                            placeholder="+7 (___) ___-__-__"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-white/5">
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95"
                                >
                                    Сохранить изменения
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl font-bold text-white mb-6">Настройки уведомлений</h3>

                            <div className="space-y-4">
                                {[
                                    { key: 'email', label: 'Email уведомления', desc: 'Получать уведомления на email' },
                                    { key: 'push', label: 'Push уведомления', desc: 'Уведомления в браузере' },
                                    { key: 'sms', label: 'SMS уведомления', desc: 'Получать SMS о важных событиях' },
                                    { key: 'newChat', label: 'Новые сообщения', desc: 'Уведомлять о новых сообщениях в чатах' },
                                    { key: 'newOrder', label: 'Новые заказы', desc: 'Уведомлять о новых заказах' },
                                    { key: 'systemNews', label: 'Новости системы', desc: 'Получать новости и обновления' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                        <div>
                                            <p className="font-medium text-white">{item.label}</p>
                                            <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A] ${notifications[item.key] ? 'bg-[#06B6D4]' : 'bg-white/10'
                                                }`}
                                        >
                                            <motion.span
                                                animate={{ x: notifications[item.key] ? 24 : 4 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                className="absolute h-5 w-5 rounded-full bg-white shadow-sm"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-6 border-t border-white/5 mt-6">
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95"
                                >
                                    Сохранить
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
                                <h3 className="text-xl font-bold text-white mb-6">Изменить пароль</h3>

                                {passwordError && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 flex items-center gap-2">
                                        <AlertCircle size={16} />
                                        {passwordError}
                                    </div>
                                )}

                                {passwordSuccess && (
                                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400 flex items-center gap-2">
                                        <Check size={16} />
                                        {passwordSuccess}
                                    </div>
                                )}

                                <div className="space-y-6 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Текущий пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwords.current}
                                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                className="w-full pl-11 pr-12 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Новый пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="password"
                                                value={passwords.new}
                                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                placeholder="Минимум 8 символов"
                                                className="w-full pl-11 pr-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Подтвердите пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <input
                                                type="password"
                                                value={passwords.confirm}
                                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                placeholder="Повторите новый пароль"
                                                className="w-full pl-11 pr-4 py-3 bg-[#050B14] border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50 focus:border-[#06B6D4] transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={handlePasswordChange}
                                        disabled={isChangingPassword}
                                        className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        {isChangingPassword && <Loader2 size={18} className="animate-spin" />}
                                        {isChangingPassword ? 'Сохранение...' : 'Изменить пароль'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#0F172A]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-white mb-2">Двухфакторная аутентификация</h3>
                                    <p className="text-slate-400 text-sm">Добавьте дополнительный уровень защиты для входа в аккаунт.</p>
                                </div>
                                <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors shrink-0">
                                    Настроить 2FA
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BackofficeSettings;
