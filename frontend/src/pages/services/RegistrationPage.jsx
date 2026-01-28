import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RegistrationPage = () => {
    const navigate = useNavigate();

    const handleOrder = (type) => {
        if (type === 'IP') {
            navigate('/auth', {
                state: {
                    intent: 'register_business',
                    type: 'IP',
                    serviceName: 'Регистрация ИП',
                    price: 4000
                }
            });
        } else {
            navigate('/auth', {
                state: {
                    intent: 'register_business',
                    type: 'OOO',
                    serviceName: 'Регистрация ООО',
                    price: 12000
                }
            });
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
            </div>
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.08]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
            </div>

            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-20">

                {/* 1. HERO */}
                <div className="relative rounded-3xl p-8 md:p-16 bg-[#0F2837] border border-white/10 overflow-hidden shadow-2xl">
                    {/* Background Effect */}
                    <div className="absolute -right-20 -top-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            <ShieldCheck size={14} /> Гарантия отсутствия отказов
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Быстрый старт вашего бизнеса <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                                без бюрократии
                            </span>
                        </h1>
                        <p className="text-lg text-[#9EACB7] mb-8 leading-relaxed max-w-xl">
                            Мы знаем все требования ФНС. Подберем ОКВЭДы, выберем выгодную систему налогов и подадим документы онлайн.
                        </p>
                    </div>
                </div>

                {/* 2. COMPARISON: IP vs OOO */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Что выбрать?</h2>
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* IP Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#06B6D4]/50 transition-all backdrop-blur-md flex flex-col"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#0F2837] flex items-center justify-center text-white mb-6 border border-white/5">
                                <User size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">ИП (Индивидуальный предприниматель)</h3>
                            <p className="text-[#9EACB7] mb-6">Идеально для фрилансеров, сферы услуг и небольших магазинов.</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" /> <span>Легко выводить деньги со счета</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" /> <span>Не нужен бухгалтер в штате</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-green-400 mt-0.5" /> <span>Штрафы в 10 раз меньше, чем у ООО</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleOrder('IP')}
                                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10"
                            >
                                Открыть ИП за 4 000 ₽
                            </button>
                        </motion.div>

                        {/* OOO Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-gradient-to-br from-[#023A55]/40 to-[#0F2837]/40 border border-white/10 hover:border-[#06B6D4]/50 transition-all backdrop-blur-md flex flex-col relative overflow-hidden"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#06B6D4] flex items-center justify-center text-[#0F2837] mb-6 shadow-lg shadow-cyan-500/20">
                                <Building2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">ООО (Компания)</h3>
                            <p className="text-[#9EACB7] mb-6">Для партнерства, инвестиций и масштабируемого бизнеса.</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-[#06B6D4] mt-0.5" /> <span>Возможность иметь до 50 партнеров</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-[#06B6D4] mt-0.5" /> <span>Можно продать бизнес или долю</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#9EACB7]">
                                    <CheckCircle2 size={16} className="text-[#06B6D4] mt-0.5" /> <span>Ответственность только уставным капиталом</span>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleOrder('OOO')}
                                className="w-full py-4 bg-[#06B6D4] hover:bg-cyan-400 text-[#0F2837] font-bold rounded-xl transition-colors shadow-lg shadow-cyan-900/20"
                            >
                                Открыть ООО за 12 000 ₽
                            </button>
                        </motion.div>

                    </div>
                </div>

                {/* 3. PROCESS STEPS */}
                {/* 3. PROCESS STEPS (Centered & Aligned) */}
                <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-12 text-center">Как мы работаем</h2>

                    {/* GRID: Note 'md:grid-cols-3' because there are 3 steps here */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {[
                            {
                                title: "Заявка и данные",
                                desc: "Вы присылаете скан паспорта и выбираете название. Мы подбираем коды деятельности."
                            },
                            {
                                title: "Выпуск ЭЦП",
                                desc: "Мы выпускаем электронную подпись, чтобы вам не пришлось ехать к нотариусу."
                            },
                            {
                                title: "Регистрация",
                                desc: "Через 3 дня вы получаете документы о регистрации и лист записи ЕГРЮЛ на почту."
                            }
                        ].map((step, index, array) => (
                            <div key={index} className="relative group flex flex-col items-center text-center">

                                {/* HEADER WRAPPER (Centered Flex) */}
                                <div className="relative w-full flex items-center justify-center mb-6">

                                    {/* CONNECTOR LINE (From Center to Center) */}
                                    {index !== array.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 left-1/2 w-[calc(100%+2rem)] h-[2px] -translate-y-1/2 -z-10">
                                            <div className="w-full h-full bg-[#0F2837] border-t border-dashed border-[#06B6D4]/30" />
                                        </div>
                                    )}

                                    {/* STEP CIRCLE */}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#0F2837] border border-[#06B6D4]/50 flex items-center justify-center text-[#06B6D4] font-bold text-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* TEXT CONTENT (Centered) */}
                                <div className="px-4">
                                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-[#9EACB7] text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default RegistrationPage;
