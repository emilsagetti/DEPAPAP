import React, { useState } from 'react';
import InformationPage from '../InformationPage';
import { ArrowRight } from 'lucide-react';
import JobApplicationModal from '../../components/JobApplicationModal';

const CareersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState('');

    const handleApply = (vacancy) => {
        setSelectedVacancy(vacancy);
        setIsModalOpen(true);
    };

    return (
        <InformationPage
            title="Карьера в Depa"
            subtitle="Присоединяйтесь к команде, которая меняет рынок юридических услуг"
        >
            <JobApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vacancyTitle={selectedVacancy}
            />

            <div className="not-prose mb-16">
                <h3 className="text-3xl font-bold text-white mb-8">Почему мы?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-4">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h4 className="text-white font-bold mb-2">LegalTech DNA</h4>
                        <p className="text-sm text-[#9EACB7] hyphens-none" style={{ textWrap: 'balance' }}>Мы не скучное бюро с кипами бумаг. Мы — технологичный сервис, меняющий индустрию.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED] mb-4">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <h4 className="text-white font-bold mb-2">Автоматизация</h4>
                        <p className="text-sm text-[#9EACB7] hyphens-none" style={{ textWrap: 'balance' }}>Рутину должны делать алгоритмы. Мы создаем инструменты, которые освобождают время.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] mb-4">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h4 className="text-white font-bold mb-2">Сложные задачи</h4>
                        <p className="text-sm text-[#9EACB7] hyphens-none" style={{ textWrap: 'balance' }}>Люди должны думать, а не копировать документы. У нас вы будете решать реальные кейсы.</p>
                    </div>
                </div>
            </div>

            <h3>Кого мы ищем</h3>
            <div className="grid gap-6 mt-8 not-prose">
                {/* Vacancy Card 1 */}
                <div className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#06B6D4]/30 to-[#7C3AED]/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">Старший юрист (Корпоративное право)</h4>
                                <div className="flex items-center gap-3 text-sm text-[#9EACB7]">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Москва / Удаленно
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#9EACB7]/50"></span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Полный день
                                    </span>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 rounded-full text-xs font-bold uppercase tracking-wider">Активная</span>
                        </div>
                        <p className="text-[#9EACB7] leading-relaxed">Сопровождение M&A сделок, разработка сложных корпоративных договоров, управление командой младших юристов. Опыт работы от 5 лет.</p>

                        <button
                            onClick={() => handleApply('Старший юрист (Корпоративное право)')}
                            className="mt-6 flex items-center text-[#06B6D4] font-medium group-hover:translate-x-1 transition-transform bg-transparent border-none p-0 cursor-pointer"
                        >
                            Откликнуться <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Vacancy Card 2 */}
                <div className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300 cursor-pointer">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F59E0B]/30 to-[#EF4444]/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#F59E0B] transition-colors">Fullstack Разработчик (React + Django)</h4>
                                <div className="flex items-center gap-3 text-sm text-[#9EACB7]">
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                                        Удаленно
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#9EACB7]/50"></span>
                                    <span className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Полный день
                                    </span>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 rounded-full text-xs font-bold uppercase tracking-wider">Активная</span>
                        </div>
                        <p className="text-[#9EACB7] leading-relaxed">Разработка новых фич для нашей платформы, интеграция с AI-ассистентами (OpenAI/Gemini), оптимизация производительности и архитектуры.</p>

                        <button
                            onClick={() => handleApply('Fullstack Разработчик (React + Django)')}
                            className="mt-6 flex items-center text-[#F59E0B] font-medium group-hover:translate-x-1 transition-transform bg-transparent border-none p-0 cursor-pointer"
                        >
                            Откликнуться <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            <h3 className="mt-12">Как попасть в команду?</h3>
            <p>
                Напишите нам на <strong>hr@depa.ru</strong>, приложите резюме и пару слов о том,
                почему вы хотите работать именно с нами.
            </p>
        </InformationPage>
    );
};

export default CareersPage;
