import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Bell, Shield, Palette, Globe,
    Mail, Phone, Lock, Eye, EyeOff, Check, X, Loader2, AlertCircle
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
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Настройки</h1>
                    <p className="text-slate-500">Управление профилем и параметрами</p>
                </div>
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl"
                    >
                        <Check size={18} />
                        <span className="font-medium">Сохранено</span>
                    </motion.div>
                )}
            </div>

            <div className="flex gap-6">
                {/* Tabs Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-56 flex-shrink-0"
                >
                    <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors"
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="backofficeSettingsTab"
                                        className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className={`relative z-10 flex items-center gap-3 ${activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-800'}`}>
                                    <tab.icon size={18} />
                                    {tab.label}
                                </span>
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
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                        >
                            <h3 className="font-semibold text-slate-900 mb-6">Личные данные</h3>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors text-sm">
                                        Изменить фото
                                    </button>
                                    <p className="text-xs text-slate-400 mt-2">JPG или PNG, максимум 5MB</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Имя</label>
                                    <input
                                        type="text"
                                        value={profile.firstName}
                                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Фамилия</label>
                                    <input
                                        type="text"
                                        value={profile.lastName}
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            placeholder="+7 (___) ___-__-__"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                            >
                                Сохранить изменения
                            </button>
                        </motion.div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                        >
                            <h3 className="font-semibold text-slate-900 mb-6">Настройки уведомлений</h3>

                            <div className="space-y-4">
                                {[
                                    { key: 'email', label: 'Email уведомления', desc: 'Получать уведомления на email' },
                                    { key: 'push', label: 'Push уведомления', desc: 'Уведомления в браузере' },
                                    { key: 'sms', label: 'SMS уведомления', desc: 'Получать SMS о важных событиях' },
                                    { key: 'newChat', label: 'Новые сообщения', desc: 'Уведомлять о новых сообщениях в чатах' },
                                    { key: 'newOrder', label: 'Новые заказы', desc: 'Уведомлять о новых заказах' },
                                    { key: 'systemNews', label: 'Новости системы', desc: 'Получать новости и обновления' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                                        <div>
                                            <p className="font-medium text-slate-900">{item.label}</p>
                                            <p className="text-sm text-slate-500">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-depa-cta' : 'bg-slate-300'
                                                }`}
                                        >
                                            <motion.span
                                                animate={{ x: notifications[item.key] ? 24 : 4 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                className="absolute h-4 w-4 rounded-full bg-white shadow-sm"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={handleSave}
                                className="mt-6 px-6 py-2.5 bg-depa-cta hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                            >
                                Сохранить
                            </button>
                        </motion.div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-6">Изменить пароль</h3>

                                {passwordError && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                                        <AlertCircle size={16} />
                                        {passwordError}
                                    </div>
                                )}

                                {passwordSuccess && (
                                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 flex items-center gap-2">
                                        <Check size={16} />
                                        {passwordSuccess}
                                    </div>
                                )}

                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Текущий пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwords.current}
                                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Новый пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="password"
                                                value={passwords.new}
                                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                placeholder="Минимум 8 символов"
                                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Подтвердите пароль</label>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="password"
                                                value={passwords.confirm}
                                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                placeholder="Повторите новый пароль"
                                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePasswordChange}
                                    disabled={isChangingPassword}
                                    className="mt-6 px-6 py-2.5 bg-depa-cta hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                                >
                                    {isChangingPassword && <Loader2 size={16} className="animate-spin" />}
                                    {isChangingPassword ? 'Сохранение...' : 'Изменить пароль'}
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <h3 className="font-semibold text-slate-900 mb-2">Двухфакторная аутентификация</h3>
                                <p className="text-slate-500 text-sm mb-4">Добавьте дополнительный уровень защиты</p>
                                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-colors">
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
