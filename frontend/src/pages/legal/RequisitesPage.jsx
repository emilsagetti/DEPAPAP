import React from 'react';
import { Copy, Building2, MapPin, CreditCard, Wallet, Phone, Mail } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Photorealistic Glass Noise Texture
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const RequisitesPage = () => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    const details = [
        { label: 'Наименование', value: 'ИП Бахилин Артём Алексеевич', icon: Building2 },
        { label: 'Юр. адрес / адрес для корреспонденции', value: '185035, Россия, Респ. Карелия, г. Петрозаводск, р-н Центр, ул. Андропова, д. 6, кв. 27', icon: MapPin },
        { label: 'ИНН', value: '100123353111', icon: ShieldCheck, copy: true },
        { label: 'ОГРНИП', value: '325100000029914', icon: FileText, copy: true },
        { label: 'Р/с', value: '40802810600009134503', icon: Wallet, copy: true },
        { label: 'Банк', value: 'АО «ТБанк»', icon: Building2 },
        { label: 'ИНН банка', value: '7710140679', icon: FileText, copy: true },
        { label: 'БИК', value: '044525974', icon: CreditCard, copy: true },
        { label: 'К/с', value: '30101810145250000974', icon: Wallet, copy: true },
        { label: 'Юр. адрес банка', value: '127287, г. Москва, ул. Хуторская 2-я, д. 38А, стр. 26', icon: MapPin },
    ];

    return (
        <div className="min-h-screen bg-[#050B14] relative font-sans text-[#E2E8F0] selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">

            {/* AMBIENT GLOW ORBS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-15"></div>
            </div>

            {/* DOT PATTERN OVERLAY */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            {/* NOISE TEXTURE */}
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            <div className="relative z-10">
                <Navbar />

                <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold uppercase tracking-wider mb-4 border border-[#06B6D4]/20">
                            <CreditCard size={14} />
                            <span>Официальная информация</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Реквизиты компании</h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Официальные данные юридического лица для оплаты услуг и документооборота
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
                            <div className="flex flex-col gap-6">
                                {details.map((item, index) => (
                                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center shrink-0">
                                                {React.createElement(item.icon, { size: 20 })}
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-400 mb-1">{item.label}</div>
                                                <div className="text-white font-medium break-all md:break-normal">{item.value}</div>
                                            </div>
                                        </div>
                                        {item.copy && (
                                            <button
                                                onClick={() => copyToClipboard(item.value)}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-sm opacity-0 group-hover:opacity-100 shrink-0"
                                            >
                                                <Copy size={14} />
                                                <span className="hidden md:inline">Копировать</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Block */}
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400">Email поддержки</div>
                                        <a href="mailto:support@depalaw.ru" className="text-white font-medium hover:text-[#06B6D4] transition-colors">support@depalaw.ru</a>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400">Телефон</div>
                                        <a href="tel:+79095684458" className="text-white font-medium hover:text-[#06B6D4] transition-colors">+7 909 568-44-58</a>
                                        <div className="text-xs text-slate-500 mt-1">Ежедневно 10:00–22:00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

// Missing icons import fix
import { ShieldCheck, FileText } from 'lucide-react';

export default RequisitesPage;
