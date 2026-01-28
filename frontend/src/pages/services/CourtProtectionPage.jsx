import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gavel, Scale, ShieldCheck, Landmark, Coins, FileWarning, ArrowRight, Building2, HardHat } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Reusable animated card component
const ServiceCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#06B6D4]/50 transition-colors group backdrop-blur-sm"
    >
        <div className="w-12 h-12 rounded-lg bg-[#0F2837] flex items-center justify-center text-[#9EACB7] group-hover:text-[#06B6D4] group-hover:scale-110 transition-all mb-4 border border-white/5">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#9EACB7] text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

const CourtProtection = () => {
    const navigate = useNavigate();

    const handleConsultation = () => {
        navigate('/auth', {
            state: {
                intent: 'create_court_case', // Unique ID for this flow
                serviceName: 'Судебная защита',
                placeholder: 'Опишите суть спора или укажите номер дела...'
            }
        });
    };

    const categories = [
        { icon: <Coins size={24} />, title: "Взыскание долгов", desc: "Работа с дебиторской задолженностью и исполнительное производство." },
        { icon: <Building2 size={24} />, title: "Корпоративные споры", desc: "Конфликты между акционерами, исключение участников, оспаривание сделок." },
        { icon: <Landmark size={24} />, title: "Споры с госорганами", desc: "Оспаривание штрафов, предписаний ФНС, ФАС, Роспотребнадзора." },
        { icon: <FileWarning size={24} />, title: "Банкротство", desc: "Защита кредиторов, включение в реестр, защита от субсидиарной ответственности." },
        { icon: <ShieldCheck size={24} />, title: "Защита репутации", desc: "Удаление клеветы в интернете и взыскание компенсации репутационного вреда." },
        { icon: <HardHat size={24} />, title: "Подряд и стройка", desc: "Споры по договорам строительного подряда, приемка работ, КС-2/КС-3." },
    ];

    const steps = [
        { title: "1. Экспресс-анализ", desc: "Изучаем документы за 24 часа и честно говорим о шансах на успех. Бесплатно." },
        { title: "2. Стратегия", desc: "Разрабатываем правовую позицию, готовим претензии и ищем пути мирного решения." },
        { title: "3. Судебный процесс", desc: "Жестко отстаиваем позицию в заседаниях. Готовим все процессуальные документы." },
        { title: "4. Деньги на счете", desc: "Получаем решение суда и исполнительный лист. Работаем с приставами до результата." },
    ];

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* GLOBAL BACKGROUND EFFECTS (Matching Outsourcing Page) */}
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
                    {/* Background Orbs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#06B6D4] text-sm font-medium mb-6 backdrop-blur-md">
                            <Gavel size={14} /> Арбитраж и суды общей юрисдикции
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Мы выигрываем споры, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-blue-500">
                                пока вы занимаетесь бизнесом
                            </span>
                        </h1>
                        <p className="text-lg text-[#9EACB7] mb-10 max-w-xl leading-relaxed">
                            Берем на себя всю судебную рутину: от анализа перспектив и составления иска до получения денег по исполнительному листу.
                        </p>

                        <button
                            onClick={handleConsultation}
                            className="px-8 py-4 bg-[#023A55] text-white rounded-xl font-bold hover:bg-[#06B6D4] transition-all shadow-lg shadow-[#023A55]/40 flex items-center gap-2 group"
                        >
                            Оценить перспективы дела
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* 2. CATEGORIES GRID */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Какие задачи мы решаем</h2>
                        <p className="text-[#9EACB7]">Полный спектр судебной защиты для бизнеса</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat, idx) => (
                            <ServiceCard key={idx} {...cat} />
                        ))}
                    </div>
                </div>

                {/* 3. TIMELINE / PROCESS */}
                <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-md">
                    <h2 className="text-3xl font-bold text-white mb-12">Как строится работа</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group flex flex-col items-center text-center">

                                {/* 1. HEADER WRAPPER (Centered Flex) */}
                                <div className="relative w-full flex items-center justify-center mb-6">

                                    {/* CONNECTOR LINE (From Center to Center) */}
                                    {index !== steps.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 left-1/2 w-[calc(100%+2rem)] h-[2px] -translate-y-1/2 -z-10">
                                            {/* The dashed line */}
                                            <div className="w-full h-full bg-[#0F2837] border-t border-dashed border-[#06B6D4]/30" />
                                        </div>
                                    )}

                                    {/* STEP CIRCLE (Centered by parent flex) */}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#0F2837] border border-[#06B6D4]/50 flex items-center justify-center text-[#06B6D4] font-bold text-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>
                                </div>

                                {/* 2. TEXT CONTENT (Centered) */}
                                <div className="px-2">
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

export default CourtProtection;
