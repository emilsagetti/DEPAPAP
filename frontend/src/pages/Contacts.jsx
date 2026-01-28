import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Copy, Send, CheckCircle2, Building2, ArrowUpRight } from 'lucide-react';
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
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Контакты</h1>
                            <p className="text-[#9EACB7] text-lg font-medium">
                                Юридическая поддержка вашего бизнеса. <br />Мы всегда на связи.
                            </p>
                        </div>

                        {/* Contact Details List */}
                        <div className="space-y-4">

                            {/* Phone */}
                            <a href={`tel:${info.phone}`} className="block p-6 rounded-2xl bg-[#0F2837]/60 border border-white/10 hover:border-[#06B6D4]/50 transition-all group backdrop-blur-md shadow-lg">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[#9EACB7] text-xs uppercase tracking-wider font-bold mb-1">Телефон</div>
                                        <div className="text-2xl font-bold text-white">{info.phone}</div>
                                    </div>
                                </div>
                            </a>

                            {/* Email */}
                            <div className="p-6 rounded-2xl bg-[#0F2837]/60 border border-white/10 backdrop-blur-md flex items-center justify-between group shadow-lg">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[#9EACB7] text-xs uppercase tracking-wider font-bold mb-1">Email</div>
                                        <div className="text-xl font-bold text-white">{info.email}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(info.email, 'email')}
                                    className="p-3 rounded-lg hover:bg-white/5 text-[#9EACB7] hover:text-white transition-colors"
                                >
                                    {copied === 'email' ? <CheckCircle2 size={20} className="text-green-400" /> : <Copy size={20} />}
                                </button>
                            </div>

                            {/* Address */}
                            <div className="p-6 rounded-2xl bg-[#0F2837]/60 border border-white/10 backdrop-blur-md flex items-center justify-between shadow-lg">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[#9EACB7] text-xs uppercase tracking-wider font-bold mb-1">Офис</div>
                                        <div className="text-lg font-bold text-white leading-snug max-w-xs">{info.address}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleCopy(info.address, 'address')}
                                    className="p-3 rounded-lg hover:bg-white/5 text-[#9EACB7] hover:text-white transition-colors"
                                >
                                    {copied === 'address' ? <CheckCircle2 size={20} className="text-green-400" /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Messengers */}
                        <div className="grid grid-cols-2 gap-4">
                            <a href={info.telegram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2AABEE]/10 border border-[#2AABEE]/20 hover:bg-[#2AABEE]/20 text-[#2AABEE] font-bold transition-all shadow-lg shadow-[#2AABEE]/10">
                                <Send size={20} /> Telegram
                            </a>
                            <a href={info.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#25D366] font-bold transition-all shadow-lg shadow-[#25D366]/10">
                                <Phone size={20} /> WhatsApp
                            </a>
                        </div>

                        {/* Legal Info */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                            <h3 className="text-white font-bold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider opacity-80">
                                <Building2 size={16} className="text-[#06B6D4]" /> Реквизиты
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-2">
                                    <span className="text-[#9EACB7]">Наименование</span>
                                    <span className="text-white font-medium text-right">{info.entity}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/5 pb-2">
                                    <span className="text-[#9EACB7]">ИНН</span>
                                    <span className="text-white font-mono text-right">{info.inn}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                    <span className="text-[#9EACB7]">ОГРНИП</span>
                                    <span className="text-white font-mono text-right">{info.ogrn}</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                    {/* --- RIGHT COLUMN: MAP --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="h-[500px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl shadow-black/50"
                    >
                        <div className="absolute inset-0 bg-[#0F2837] z-0" />

                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=30.344447%2C59.924151&z=17"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            className="relative z-10 w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-500"
                            style={{ filter: 'invert(1) grayscale(100%) brightness(0.6) contrast(1.3)' }}
                        ></iframe>

                        <a
                            href="https://yandex.ru/maps/-/CDu~yK3L"
                            target="_blank"
                            rel="noreferrer"
                            className="absolute bottom-6 right-6 z-20 px-6 py-3 bg-[#06B6D4] text-[#0F2837] font-bold rounded-xl shadow-lg hover:bg-cyan-300 transition-colors flex items-center gap-2"
                        >
                            Открыть на карте <ArrowUpRight size={20} />
                        </a>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contacts;
