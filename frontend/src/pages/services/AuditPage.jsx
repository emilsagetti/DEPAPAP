import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSearch, AlertTriangle, Scale, ShieldCheck, FileText, Banknote, ArrowRight, Gavel, FileWarning, Scissors, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AuditPage = () => {
    const navigate = useNavigate();

    const handleOrder = () => {
        navigate('/auth', {
            state: {
                intent: 'upload_audit_file', // Unique ID for this flow
                serviceName: 'Аудит договора',
                price: 5000,
                isFileUpload: true
            }
        });
    };

    const risks = [
        { icon: <Banknote size={24} />, title: "Финансовые ловушки", desc: "Скрытые комиссии, штрафы за малейшие нарушения и невыгодные условия оплаты." },
        { icon: <Scissors size={24} />, title: "Условия выхода", desc: "Сможете ли вы расторгнуть договор без потерь? Проверяем условия одностороннего отказа." },
        { icon: <Gavel size={24} />, title: "Подсудность", desc: "Где будет суд? Исключаем неудобные юрисдикции и третейские оговорки." },
        { icon: <FileWarning size={24} />, title: "Налоговые риски", desc: "Проверяем формулировки, к которым может придраться налоговая (ФНС)." },
        { icon: <AlertTriangle size={24} />, title: "Ответственность", desc: "Балансируем штрафы. Убираем пункты, где вы отвечаете всем имуществом." },
        { icon: <Scale size={24} />, title: "Соответствие закону", desc: "Исключаем ничтожные пункты, которые противоречат ГК РФ." },
    ];

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-20">

                {/* 1. HERO SECTION */}
                <div className="relative rounded-3xl p-8 md:p-16 bg-[#0F2837] border border-white/10 overflow-hidden shadow-2xl">
                    {/* Background Glow */}
                    <div className="absolute -left-20 top-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6">
                                <AlertTriangle size={14} /> Защита от плохих сделок
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Находим риски, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                                    которые вы не видите
                                </span>
                            </h1>
                            <p className="text-lg text-[#9EACB7] mb-8 leading-relaxed">
                                Один пункт мелким шрифтом может стоить бизнеса. Мы проверим каждое слово и дадим развернутое заключение.
                            </p>
                            <button
                                onClick={handleOrder}
                                className="px-8 py-4 bg-[#023A55] text-white rounded-xl font-bold hover:bg-[#06B6D4] transition-all shadow-lg shadow-[#023A55]/40 flex items-center gap-2"
                            >
                                Загрузить договор на проверку <ArrowRight size={20} />
                            </button>
                        </div>

                        {/* Abstract Document Visual */}
                        <div className="relative hidden lg:flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative w-72 h-96 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl p-6 shadow-2xl"
                            >
                                {/* Lines imitating text */}
                                <div className="w-1/2 h-4 bg-white/20 rounded mb-6" />
                                <div className="space-y-3">
                                    <div className="w-full h-2 bg-white/10 rounded" />
                                    <div className="w-full h-2 bg-white/10 rounded" />
                                    <div className="w-3/4 h-2 bg-white/10 rounded" />
                                    <div className="w-full h-2 bg-red-500/40 rounded animate-pulse" /> {/* Danger line */}
                                    <div className="w-full h-2 bg-white/10 rounded" />
                                </div>

                                {/* Floating Search Icon */}
                                <motion.div
                                    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                                    transition={{ repeat: Infinity, duration: 5 }}
                                    className="absolute -right-8 -bottom-8 w-20 h-20 bg-[#06B6D4] rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 text-[#0F2837]"
                                >
                                    <FileSearch size={40} />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 2. RISKS GRID */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Что мы проверяем?</h2>
                        <p className="text-[#9EACB7]">6 главных точек контроля безопасности сделки</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {risks.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-[#0F2837] flex items-center justify-center text-[#06B6D4] mb-4 border border-white/5">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-[#9EACB7] text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. RESULT SECTION */}
                <div className="bg-gradient-to-br from-[#023A55]/40 to-[#0F2837]/40 rounded-3xl p-8 md:p-12 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Результат работы</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Протокол разногласий</h4>
                                    <p className="text-[#9EACB7] text-sm">Документ для вашего контрагента с юридическим обоснованием наших правок.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Безопасная версия</h4>
                                    <p className="text-[#9EACB7] text-sm">Готовый к подписанию файл, где все риски устранены.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-[#0F2837] rounded-xl border border-white/10 text-center">
                            <p className="text-white font-medium mb-2">Срок выполнения</p>
                            <div className="text-4xl font-bold text-[#06B6D4] mb-2">24 часа</div>
                            <p className="text-[#9EACB7] text-sm">для стандартных договоров</p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default AuditPage;
