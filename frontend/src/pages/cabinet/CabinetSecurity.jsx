import React, { useState } from 'react';
import { Shield, Key, History, Smartphone } from 'lucide-react';
import CabinetPageHeader from '../../components/common/CabinetPageHeader';
import AuthService from '../../api/auth.service';

const CabinetSecurity = () => {
    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        re_new_password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleChangePassword = async () => {
        if (passwords.new_password !== passwords.re_new_password) {
            alert("Новые пароли не совпадают");
            return;
        }
        setIsLoading(true);
        try {
            // Check if setPassword exists, otherwise use a generic request
            if (AuthService.setPassword) {
                await AuthService.setPassword(passwords.new_password, passwords.current_password);
                alert("Пароль успешно изменен");
                setPasswords({ current_password: '', new_password: '', re_new_password: '' });
            } else {
                // Fallback if not implemented in service wrapper yet
                console.warn("AuthService.setPassword not implemented");
                alert("Функция смены пароля в разработке (API)");
            }
        } catch (error) {
            console.error("Failed to change password", error);
            alert("Ошибка смены пароля: " + (error.response?.data?.detail || "Проверьте текущий пароль"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-[#06B6D4]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

            <CabinetPageHeader title="Безопасность" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Change Password */}
                <div
                    className="glass-card p-8 rounded-[32px] border border-white/5 animate-slide-up opacity-0 relative group overflow-hidden"
                    style={{ animationDelay: '100ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <h3 className="font-bold text-lg text-white mb-8 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-[#06B6D4]/10 rounded-xl text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Key size={22} />
                        </div>
                        Смена пароля
                    </h3>

                    <div className="space-y-5 relative z-10">
                        <div>
                            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider pl-1">Текущий пароль</label>
                            <input
                                type="password"
                                name="current_password"
                                value={passwords.current_password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#06B6D4]/50 focus:bg-[#050B14] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider pl-1">Новый пароль</label>
                            <input
                                type="password"
                                name="new_password"
                                value={passwords.new_password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#06B6D4]/50 focus:bg-[#050B14] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] outline-none transition-all duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider pl-1">Повторите новый пароль</label>
                            <input
                                type="password"
                                name="re_new_password"
                                value={passwords.re_new_password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-[#050B14]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:border-[#06B6D4]/50 focus:bg-[#050B14] focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] outline-none transition-all duration-300"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            disabled={isLoading || !passwords.current_password || !passwords.new_password}
                            className="w-full px-8 py-4 bg-gradient-to-r from-[#06B6D4] to-blue-600 text-white rounded-xl font-bold hover:from-[#0891B2] hover:to-blue-700 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transform active:scale-[0.98] mt-2"
                        >
                            {isLoading ? "Обновление..." : "Обновить пароль"}
                        </button>
                    </div>
                </div>

                {/* 2FA Placeholder */}
                <div
                    className="glass-card p-8 rounded-[32px] border border-white/5 flex flex-col justify-between animate-slide-up opacity-0 relative group overflow-hidden"
                    style={{ animationDelay: '200ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-3">
                            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                <Shield size={22} />
                            </div>
                            Двухфакторная аутентификация
                        </h3>
                        <p className="text-white/50 mb-8 leading-relaxed text-sm">
                            Усильте защиту вашего аккаунта, включив подтверждение входа через SMS или Google Authenticator. Это предотвратит несанкционированный доступ.
                        </p>
                    </div>

                    <div className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer group/item relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover/item:bg-white/10 transition-colors border border-white/5">
                                <Smartphone size={24} className="text-white/40 group-hover/item:text-white transition-colors" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm mb-0.5">Вход по SMS</div>
                                <div className="text-xs text-white/40 group-hover/item:text-white/60 transition-colors">Не активно</div>
                            </div>
                        </div>
                        <div className="w-12 h-7 bg-white/10 rounded-full relative transition-colors group-hover/item:bg-white/20">
                            <div className="w-5 h-5 bg-white/50 rounded-full absolute left-1 top-1 shadow-sm transition-transform group-hover/item:scale-110"></div>
                        </div>
                    </div>
                </div>

                {/* Session History */}
                <div
                    className="glass-card p-8 rounded-[32px] border border-white/5 lg:col-span-2 animate-slide-up opacity-0 relative group"
                    style={{ animationDelay: '300ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06B6D4]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-3 relative z-10">
                        <div className="p-2.5 bg-[#06B6D4]/10 rounded-xl text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <History size={22} />
                        </div>
                        История входов
                    </h3>
                    <div className="space-y-2 relative z-10">
                        {[
                            { device: 'Chrome / MacOS', ip: '192.168.1.1', location: 'Москва, Россия', date: 'Только что', active: true },
                            { device: 'Safari / iPhone 13', ip: '192.168.1.45', location: 'Москва, Россия', date: 'Вчера, 14:30', active: false },
                            { device: 'Firefox / Windows 10', ip: '178.23.41.22', location: 'Санкт-Петербург, Россия', date: '21 янв, 09:15', active: false },
                        ].map((session, i) => (
                            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-all hover:translate-x-1 hover:border-white/10 gap-4 group/session">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2.5 h-2.5 rounded-full ${session.active ? 'bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse' : 'bg-white/20'}`}></div>
                                    <div>
                                        <p className="font-bold text-white text-sm group-hover/session:text-[#06B6D4] transition-colors">{session.device}</p>
                                        <p className="text-xs text-white/40 mt-0.5 font-mono">{session.ip} • <span className="text-white/30">{session.location}</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                    <span className="text-xs text-white/30 font-medium">{session.date}</span>
                                    {session.active && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider bg-[#06B6D4]/10 text-[#06B6D4] px-2.5 py-1 rounded-lg border border-[#06B6D4]/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                                            Текущая сессия
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetSecurity;
