import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail, Server, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const PrivacyPage = () => {
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
                                <Lock size={18} />
                                <span>Конфиденциальность</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Политика обработки персональных данных</h1>
                            <p className="text-slate-400">Вступает в силу с 24 января 2026 г.</p>
                        </div>
                    </div>

                    <div className="space-y-12 text-slate-300 leading-relaxed text-base md:text-lg">

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
                            <p>
                                <strong>ИП Бахилин Артём Алексеевич</strong> (далее — Оператор) уважает ваше право на конфиденциальность.
                                Настоящая Политика описывает, какие данные мы собираем, как мы их используем и защищаем.
                            </p>
                        </div>

                        <Section title="1. Какие данные мы собираем" icon={Eye}>
                            <p>Мы собираем только минимально необходимый объем данных для оказания услуг:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                                <li><strong>Контактные данные:</strong> адрес электронной почты, номер телефона.</li>
                                <li><strong>Личные данные:</strong> имя, фамилия, отчество.</li>
                                <li><strong>Корпоративные данные:</strong> название компании, ИНН (для заключения договора).</li>
                                <li><strong>Технические данные:</strong> IP-адрес, данные о браузере, файлы cookies (для обеспечения безопасности и работы сайта).</li>
                            </ul>
                        </Section>

                        <Section title="2. Цели сбора данных" icon={Shield}>
                            <p>Мы используем ваши данные исключительно для:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-400">
                                <li>Исполнения договора публичной оферты (предоставление доступа к сервису);</li>
                                <li>Связи с вами по вопросам оказания услуг и технической поддержки;</li>
                                <li>Направления чеков об оплате и актов приемки-передачи услуг;</li>
                                <li>Улучшения качества работы нашего веб-приложения.</li>
                            </ul>
                        </Section>

                        <Section title="3. Передача третьим лицам" icon={Server}>
                            <p>Мы не продаем и не передаем ваши данные третьим лицам, за исключением случаев, необходимых для оказания услуг:</p>
                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="font-bold text-white mb-1">Платежный провайдер</div>
                                    <p className="text-sm">АО «ТБанк»</p>
                                    <p className="text-xs text-slate-500 mt-1">Для обработки платежей. Мы не храним полные данные ваших карт.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="font-bold text-white mb-1">Хостинг-провайдер</div>
                                    <p className="text-sm">ООО «Регистратор доменных имен РЕГ.РУ»</p>
                                    <p className="text-xs text-slate-500 mt-1">Хранение данных на защищенных серверах в РФ.</p>
                                </div>
                            </div>
                        </Section>

                        <Section title="4. Сроки хранения и безопасность" icon={Lock}>
                            <p>Мы храним ваши персональные данные до момента удаления аккаунта или отзыва согласия на обработку. После прекращения отношений данные удаляются, за исключением случаев, когда их хранение требуется законодательством (например, для налогового учета).</p>
                        </Section>

                        <Section title="5. Права пользователя и контакты" icon={Mail}>
                            <p>Вы имеете право на доступ к своим данным, их исправление или удаление. По любым вопросам обработки персональных данных вы можете связаться с нами:</p>
                            <div className="flex flex-col gap-2 mt-4">
                                <a href="mailto:support@depalaw.ru" className="text-[#06B6D4] hover:underline font-medium">support@depalaw.ru</a>
                                <p>ИП Бахилин Артём Алексеевич, ИНН 100123353111</p>
                            </div>
                        </Section>

                    </div>

                </main>
                <Footer />
            </div>
        </div>
    );
};

const Section = ({ title, icon: Icon, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
    >
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center">
                {React.createElement(Icon, { size: 20 })}
            </div>
            {title}
        </h2>
        <div className="text-slate-400 leading-relaxed pl-[52px]">
            {children}
        </div>
    </motion.div>
);

export default PrivacyPage;
