import React, { useState, useEffect } from 'react';
import { User, Building, Phone, Mail, Save, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CabinetPageHeader from '../../components/common/CabinetPageHeader';

const CabinetProfile = () => {
    const { user, logout, updateProfile } = useAuth();

    // Initial state based on user
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        company_name: '',
        inn: '',
        ogrn: '',
        address: ''
    });

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.profile?.phone || '',
                position: user.profile?.position || '',
                company_name: user.company?.name || '',
                inn: user.company?.inn || '',
                ogrn: user.company?.ogrn || '',
                address: user.company?.address || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // We assume updateProfile handles updating user/profile/company
            // This might need backend adjustments to handle Company nested updates if not already there
            // Or we might need separate API calls. For now trusting updateProfile from context which uses authService.
            await updateProfile(formData);
            alert("Профиль обновлен!");
        } catch (error) {
            console.error("Save failed", error);
            alert("Ошибка сохранения профиля");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in relative z-10">
            <CabinetPageHeader title="Профиль компании" parent="Управление данными">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95"
                >
                    <LogOut size={18} />
                    Выйти из аккаунта
                </button>
            </CabinetPageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div
                    className="glass-card p-1 rounded-[32px] lg:col-span-2 animate-slide-up opacity-0 relative group"
                    style={{ animationDelay: '100ms' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/20 to-transparent rounded-[32px] pointer-events-none opacity-50"></div>
                    <div className="bg-[#050B14]/90 backdrop-blur-xl rounded-[30px] p-8 border border-white/10 relative z-10 h-full">

                        {/* Organization Params */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2.5 bg-[#06B6D4]/10 rounded-xl text-[#06B6D4] border border-[#06B6D4]/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                    <Building size={22} />
                                </div>
                                <span className="tracking-tight">Данные организации</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Название компании</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        placeholder="Например: ООО 'Ромашка'"
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">ИНН</label>
                                    <input
                                        type="text"
                                        name="inn"
                                        value={formData.inn}
                                        onChange={handleChange}
                                        placeholder="0000000000"
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">ОГРН</label>
                                    <input
                                        type="text"
                                        name="ogrn"
                                        value={formData.ogrn}
                                        onChange={handleChange}
                                        placeholder="0000000000000"
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] font-mono"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Юридический адрес</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Россия, г. Москва..."
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/5 my-8"></div>

                        {/* Contact Person */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2.5 bg-[#06B6D4]/10 rounded-xl text-[#06B6D4] border border-[#06B6D4]/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                    <User size={22} />
                                </div>
                                <span className="tracking-tight">Контактное лицо</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Имя</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Фамилия</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Email (Логин)</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-[#050B14]/30 border border-white/5 rounded-2xl pl-12 pr-5 py-4 text-white/70 cursor-not-allowed focus:outline-none"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Телефон</label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+7 (999) 000-00-00"
                                            className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1 mb-2 block">Должность</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        placeholder="Генеральный директор"
                                        className="w-full bg-[#0F172A]/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#06B6D4]/50 focus:bg-[#0F172A] transition-all placeholder:text-white/20 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-white/5 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-10 py-4 bg-gradient-to-r from-[#06B6D4] to-blue-600 hover:from-[#0891B2] hover:to-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-3 disabled:opacity-50 hover:scale-[1.02] active:scale-95 duration-200 transition-all"
                            >
                                <Save size={20} /> {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Your Manager Card */}
                    <div
                        className="glass-card p-1 rounded-[32px] animate-slide-up opacity-0 relative group"
                        style={{ animationDelay: '300ms' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/20 to-blue-600/20 rounded-[32px] pointer-events-none opacity-50"></div>
                        <div className="bg-[#050B14]/90 backdrop-blur-xl rounded-[30px] p-8 border border-white/10 relative z-10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none"></div>

                            <h3 className="font-bold text-lg text-white mb-6">Ваш менеджер</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#06B6D4] to-blue-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-[#050B14] shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                                    А
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-white leading-tight">Анна Сергеева</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                                        <p className="text-sm font-medium text-[#06B6D4]">Персональный менеджер</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    Написать в чат
                                </button>
                                <button className="w-full py-3.5 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-xl text-[#06B6D4] font-bold text-sm hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                    Заказать звонок
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Tip */}
                    <div className="glass-card p-6 rounded-[24px] border border-white/5 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-white mb-2">Безопасность</h4>
                            <p className="text-sm text-white/50 mb-4">Рекомендуем включить двухфакторную аутентификацию для защиты аккаунта.</p>
                            <button className="text-sm font-medium text-[#06B6D4] hover:text-white transition-colors">
                                Перейти в настройки →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CabinetProfile;
