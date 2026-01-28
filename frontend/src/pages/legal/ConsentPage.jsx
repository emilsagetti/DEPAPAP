import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const ConsentPage = () => {
    return (
        <div className="min-h-screen bg-[#050B14] relative font-sans text-[#E2E8F0] selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">

            {/* AMBIENT GLOW ORBS */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-15"></div>
            </div>

            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            <div className="relative z-10">
                <Navbar />

                <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">

                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} />
                        <span>Вернуться на главную</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-white/10 pb-8">
                        <div>
                            <div className="flex items-center gap-3 text-[#06B6D4] mb-2 text-sm font-bold uppercase tracking-wider">
                                <FileText size={18} />
                                <span>Юридический документ</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Согласие на обработку персональных данных</h1>
                            <p className="text-slate-400">Последнее обновление: 24 января 2026 г.</p>
                        </div>
                    </div>

                    <div className="space-y-12 text-slate-300 leading-relaxed text-base md:text-lg">

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
                            <p>
                                Настоящим я, <strong>Пользователь сайта depalaw.ru</strong> (далее — «Субъект ПДн»), свободно, своей волей и в своем интересе даю конкретное, информированное и сознательное согласие
                                <span className="text-white font-bold block mt-2">Индивидуальному предпринимателю Бахилину Артёму Алексеевичу (ИНН 100123353111)</span>
                                (далее — «Оператор»), на обработку моих персональных данных на следующих условиях:
                            </p>
                        </div>

                        <Section title="1. Цель обработки персональных данных">
                            <p>Обработка персональных данных осуществляется с целью:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                                <li>Регистрации на сайте depalaw.ru и предоставления доступа к личному кабинету;</li>
                                <li>Заключения, исполнения и прекращения гражданско-правовых договоров (публичной оферты);</li>
                                <li>Оказания платных юридических услуг и консультаций;</li>
                                <li>Технической поддержки и улучшения качества работы сервиса;</li>
                                <li>Направления информационных уведомлений о статусе заказа/подписки.</li>
                            </ul>
                        </Section>

                        <Section title="2. Перечень персональных данных">
                            <p>Настоящее согласие распространяется на следующую информацию:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                                <li>Фамилия, имя, отчество;</li>
                                <li>Адрес электронной почты (e-mail);</li>
                                <li>Номер телефона;</li>
                                <li>Данные о компании (наименование, ИНН), если Пользователь выступает представителем юрлица;</li>
                                <li>Платежные данные (в зашифрованном виде, обрабатываются платежным провайдером).</li>
                            </ul>
                        </Section>

                        <Section title="3. Действия с персональными данными">
                            <p>Оператор вправе совершать следующие действия (операции): сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
                            <p className="mt-4">Обработка может осуществляться как автоматизированным, так и неавтоматизированным способом.</p>
                        </Section>

                        <Section title="4. Срок действия и порядок отзыва">
                            <p>Согласие действует бессрочно до достижения целей обработки или до момента его отзыва Субъектом ПДн.</p>
                            <p className="mt-4">
                                Согласие может быть отозвано в любой момент путем направления письменного заявления Оператору на электронную почту:
                            </p>
                            <a href="mailto:support@depalaw.ru" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#06B6D4]/10 text-[#06B6D4] rounded-lg hover:bg-[#06B6D4]/20 transition-colors">
                                <Mail size={16} />
                                support@depalaw.ru
                            </a>
                        </Section>

                        <div className="p-6 border-t border-white/10 text-sm text-slate-500">
                            Полный текст Политики конфиденциальности доступен по адресу: <Link to="/privacy" className="text-[#06B6D4] hover:underline">depalaw.ru/privacy</Link>
                        </div>
                    </div>

                </main>
                <Footer />
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
    >
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="text-slate-400 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

export default ConsentPage;
