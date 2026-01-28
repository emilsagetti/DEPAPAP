import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Copy, Send, CheckCircle2, Building2, ArrowUpRight } from 'lucide-react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contacts = () => {
    const [copied, setCopied] = useState('');

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    const info = {
        phone: '+7 (969) 208-45-38',
        email: 'office@baalegal.ru',
        address: 'г. Санкт-Петербург, ул. Достоевского, 23',
        telegram: 'https://t.me/+79692084538',
        whatsapp: 'https://wa.me/79692084538',
        entity: 'ИП Бахилин Артём Алексеевич',
        inn: '100123353111',
        ogrn: '325100000029914'
    };

    // Custom dark theme for Yandex Map (approximate visual match via filters)
    const mapState = { center: [59.924151, 30.344447], zoom: 16 };

    // SVG for the custom marker to handle "Pulse" effect within the map canvas context
    const markerIcon = {
        href: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="20" fill="#06B6D4" opacity="0.4">
                <animate attributeName="r" values="20;45" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="14" fill="#06B6D4" stroke="#ffffff" stroke-width="3"/>
        </svg>`),
        size: [80, 80],
        offset: [-40, -40],
    };

    return (
        <div className="min-h-screen bg-[#050B14] relative overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-10">

                    {/* --- LEFT COLUMN: INFO --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">Контакты</h1>
                            <p className="text-[#9EACB7] text-lg font-medium leading-relaxed">
                                Юридическая поддержка вашего бизнеса. <br />Мы всегда на связи.
                            </p>
                        </div>

                        {/* Contact Details List */}
                        <div className="space-y-4">

                            {/* Phone */}
                            <a href={`tel:${info.phone}`} className="block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#06B6D4]/30 transition-all duration-500 group backdrop-blur-md shadow-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)] transition-all duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Телефон</div>
                                        <div className="text-2xl font-bold text-white tracking-tight group-hover:text-[#06B6D4] transition-colors">{info.phone}</div>
                                    </div>
                                </div>
                            </a>

                            {/* Email */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#06B6D4]/30 transition-all duration-300 backdrop-blur-md flex items-center justify-between group shadow-xl hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)]">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Email</div>
                                        <div className="text-xl font-bold text-white tracking-tight">{info.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(info.email, 'email')}
                                    className="p-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95"
                                >
                                    {copied === 'email' ? <CheckCircle2 size={20} className="text-[#06B6D4]" /> : <Copy size={20} />}
                                </button>
                            </div>

                            {/* Address */}
                            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-[#06B6D4]/30 transition-all duration-300 backdrop-blur-md flex items-center justify-between group shadow-xl">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Офис</div>
                                        <div className="text-lg font-bold text-white leading-snug max-w-xs tracking-tight">{info.address}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(info.address, 'address')}
                                    className="p-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-95"
                                >
                                    {copied === 'address' ? <CheckCircle2 size={20} className="text-[#06B6D4]" /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Messengers */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href={info.telegram} target="_blank" rel="noreferrer" className="group relative flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/20 hover:bg-[#2AABEE]/20 text-[#2AABEE] font-bold transition-all shadow-[0_0_20px_-5px_rgba(42,171,238,0.2)] hover:shadow-[0_0_30px_-5px_rgba(42,171,238,0.4)] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <Send size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> Telegram
                            </a>
                            <a href={info.whatsapp} target="_blank" rel="noreferrer" className="group relative flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#25D366] font-bold transition-all shadow-[0_0_20px_-5px_rgba(37,211,102,0.2)] hover:shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <Phone size={20} className="group-hover:-rotate-12 transition-transform" /> WhatsApp
                            </a>
                        </div>

                        {/* Legal Info */}
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
                            <h3 className="text-slate-400 font-bold flex items-center gap-2 mb-6 text-[10px] uppercase tracking-widest">
                                <Building2 size={14} className="text-[#06B6D4]" /> Реквизиты
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/[0.05] pb-3">
                                    <span className="text-slate-500">Наименование</span>
                                    <span className="text-white font-medium text-right sm:max-w-[60%]">{info.entity}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/[0.05] pb-3">
                                    <span className="text-slate-500">ИНН</span>
                                    <span className="text-white font-mono text-right tracking-wider">{info.inn}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <span className="text-slate-500">ОГРНИП</span>
                                    <span className="text-white font-mono text-right tracking-wider">{info.ogrn}</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* --- RIGHT COLUMN: MAP --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-[500px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl shadow-black/50 group"
                    >
                        {/* Yandex Map Component with Scoped Styles for Dark Mode */}
                        <div className="w-full h-full relative z-10 custom-map-container rounded-3xl overflow-hidden">
                            <style>
                                {`
                                    /* Apply Dark Mode Filter only to the Map Tiles */
                                    .custom-map-container [class*="ymaps"][class*="-ground-pane"] {
                                        filter: invert(1) grayscale(100%) brightness(0.6) contrast(1.3);
                                    }
                                    /* Hide all copyright info, promos, and extra buttons */
                                    .custom-map-container [class*="-copyright"], 
                                    .custom-map-container [class*="-copyright"] *,
                                    .custom-map-container [class*="-gotoymaps"],
                                    .custom-map-container [class*="-gototech"],
                                    .custom-map-container [class*="-zoom"] {
                                        display: none !important;
                                        opacity: 0 !important;
                                    }
                                `}
                            </style>
                            <YMaps query={{ lang: 'ru_RU', apikey: '' }}>
                                <Map
                                    defaultState={{ ...mapState, controls: [] }}
                                    width="100%"
                                    height="100%"
                                    options={{ suppressMapOpenBlock: true }}
                                >
                                    {/* Custom Animated Marker */}
                                    <Placemark
                                        geometry={[59.924151, 30.344447]}
                                        options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: markerIcon.href,
                                            iconImageSize: markerIcon.size,
                                            iconImageOffset: markerIcon.offset,
                                        }}
                                        properties={{
                                            hintContent: 'OFFICE DEPA',
                                            balloonContentBody: `
                                                <div style="text-align:center; padding: 5px;">
                                                    <b style="color:#000;">OFFICE DEPA</b><br/>
                                                    <span style="color:#555;">ул. Достоевского, 23</span>
                                                </div>
                                            `
                                        }}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                    />
                                </Map>
                            </YMaps>
                        </div>

                        {/* Overlay Gradient for seamless integration with card borders */}
                        <div className="absolute inset-0 z-20 pointer-events-none border-[1px] border-white/10 rounded-3xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />

                        <a
                            href="https://yandex.ru/maps/-/CDu~yK3L"
                            target="_blank"
                            rel="noreferrer"
                            className="absolute bottom-6 right-6 z-30 px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white font-bold rounded-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 group/btn hover:-translate-y-1"
                        >
                            Открыть на карте <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contacts;
