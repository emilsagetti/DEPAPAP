import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const OfferPage = () => {
    const [activeSection, setActiveSection] = useState('section-1');

    useEffect(() => {
        // Simple scroll spy could be added here
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] relative font-sans text-[#E2E8F0] selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">

            {/* === BACKGROUND LAYERS === */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[130px] opacity-15"></div>
            </div>
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            {/* === CONTENT === */}
            <div className="relative z-10">
                <Navbar />

                <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">

                    <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={16} />
                        <span>Вернуться на главную</span>
                    </Link>

                    {/* HEADER BLOCK */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-white/10 pb-8">
                        <div>
                            <div className="flex items-center gap-3 text-[#06B6D4] mb-2 text-sm font-bold uppercase tracking-wider">
                                <ShieldCheck size={18} />
                                <span>Юридическая информация</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Публичная оферта</h1>
                            <p className="text-slate-400">Последнее обновление: 24 января 2026 г.</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors backdrop-blur-md"
                            >
                                <Printer size={18} /> <span className="hidden md:inline">Печать</span>
                            </button>
                        </div>
                    </div>

                    {/* DOCUMENT GRID */}
                    <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">

                        {/* SIDEBAR */}
                        <div className="hidden lg:block sticky top-32 space-y-1">
                            <h3 className="text-white font-bold mb-4 px-4 text-sm uppercase tracking-wider opacity-80">Содержание</h3>
                            {[
                                { id: 'section-1', label: '1. Общие положения' },
                                { id: 'section-2', label: '2. Предмет договора' },
                                { id: 'section-3', label: '3. Оформление и оплата' },
                                { id: 'section-4', label: '4. Сроки и порядок оказания' },
                                { id: 'section-5', label: '5. Возврат средств' },
                                { id: 'section-6', label: '6. Разрешение споров' },
                                { id: 'section-7', label: '7. Реквизиты исполнителя' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`
                                w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all border-l-2
                                ${activeSection === item.id
                                            ? 'text-[#06B6D4] border-[#06B6D4] bg-[#06B6D4]/5 font-medium'
                                            : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                                        }
                            `}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="space-y-12 text-slate-300 leading-relaxed text-base md:text-lg">

                            {/* Preamble */}
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-base shadow-xl">
                                <p>
                                    Настоящий документ является официальным предложением (публичной офертой)
                                    <span className="text-white font-bold"> Индивидуального предпринимателя Бахилина Артёма Алексеевича </span>
                                    (далее — «Исполнитель») заключить договор на оказание юридических услуг с любым физическим или юридическим лицом (далее — «Заказчик») на изложенных ниже условиях.
                                </p>
                            </div>

                            {/* SECTIONS */}
                            <Section id="section-1" number="1" title="Общие положения">
                                <p>1.1. Данный документ является публичной офертой в соответствии с п. 2 ст. 437 ГК РФ. Полным и безоговорочным акцептом настоящей публичной оферты является осуществление Заказчиком оплаты предложенных Услуг.</p>
                                <p>1.2. Оплачивая услуги, Заказчик подтверждает, что он ознакомился с условиями настоящей Оферты, Политикой конфиденциальности и дает согласие на обработку персональных данных.</p>
                            </Section>

                            <Section id="section-2" number="2" title="Предмет договора">
                                <p>2.1. Исполнитель обязуется оказать Заказчику юридические услуги и/или консультации дистанционным способом (онлайн), а Заказчик обязуется принять и оплатить эти услуги.</p>
                                <p>2.2. Перечень услуг включает в себя: устные и письменные консультации, правовой анализ документов, подготовку договоров и иных правовых документов, проверку контрагентов.</p>
                                <p>2.3. Объем услуг определяется выбранным Заказчиком Тарифом подписки или конкретной разовой услугой на сайте depalaw.ru.</p>
                            </Section>

                            <Section id="section-3" number="3" title="Порядок оформления и оплаты">
                                <p>3.1. Заказ услуг осуществляется Заказчиком самостоятельно через интерфейс сайта.</p>
                                <p>3.2. Стоимость услуг определяется Исполнителем и публикуется на сайте. Исполнитель применяет упрощенную систему налогообложения, НДС не облагается.</p>
                                <p>3.3. Оплата производится в порядке 100% предоплаты посредством безналичного перевода с использованием банковских карт или иных платежных систем, подключенных на сайте.</p>
                                <p>3.4. Обязательство по оплате считается исполненным с момента зачисления денежных средств на расчетный счет Исполнителя.</p>
                            </Section>

                            <Section id="section-4" number="4" title="Сроки и порядок оказания услуг">
                                <p>4.1. Услуги оказываются в течение срока действия оплаченной подписки или в сроки, указанные в описании разовой услуги.</p>
                                <p>4.2. Началом оказания услуг считается момент предоставления Заказчику доступа к функционалу Личного кабинета или начала консультации с юристом.</p>
                                <p>4.3. Результаты оказания услуг (до документы, заключения) направляются Заказчику в электронном виде через Личный кабинет или на электронную почту.</p>
                            </Section>

                            <Section id="section-5" number="5" title="Порядок возвратов">
                                <p>5.1. Заказчик вправе отказаться от услуг до момента начала их фактического оказания. В этом случае Исполнитель возвращает полную стоимость услуг за вычетом комиссии платежной системы.</p>
                                <p>5.2. Возврат денежных средств за уже оказанные услуги или предоставленный доступ к контенту/базе знаний (если доступ был фактически предоставлен) не производится.</p>
                                <p>5.3. При отказе Заказчика от услуг в процессе их оказания, Исполнитель возвращает стоимость за вычетом понесенных фактических расходов (рассчитывается пропорционально оказанным услугам). Срок рассмотрения заявления на возврат — 10 рабочих дней.</p>
                            </Section>

                            <Section id="section-6" number="6" title="Ответственность и разрешение споров">
                                <p>6.1. За неисполнение или ненадлежащее исполнение обязательств стороны несут ответственность в соответствии с законодательством РФ.</p>
                                <p>6.2. Все споры и разногласия решаются путем переговоров. Претензионный порядок обязателен. Срок ответа на претензию — 30 календарных дней.</p>
                                <p>6.3. При недостижении соглашения спор передается на рассмотрение в суд по месту нахождения Исполнителя.</p>
                            </Section>

                            {/* REQUISITES */}
                            <div id="section-7" className="pt-10 border-t border-white/10 mt-10">
                                <h2 className="text-2xl font-bold text-white mb-8">7. Реквизиты Исполнителя</h2>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl grid md:grid-cols-2 gap-8 text-sm shadow-2xl relative overflow-hidden">
                                    {/* Decorative background for requisites card */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4]/10 rounded-full blur-[40px]" />

                                    <div className="space-y-3 relative z-10">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Наименование</div>
                                        <div className="text-white font-bold text-lg">ИП Бахилин Артём Алексеевич</div>
                                    </div>
                                    <div className="space-y-3 relative z-10">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">ИНН</div>
                                        <div className="text-white font-mono text-lg bg-white/5 p-2 rounded w-fit border border-white/5">100123353111</div>
                                    </div>
                                    <div className="space-y-3 relative z-10">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">ОГРНИП</div>
                                        <div className="text-white font-mono text-lg bg-white/5 p-2 rounded w-fit border border-white/5">325100000029914</div>
                                    </div>
                                    <div className="space-y-3 relative z-10">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider font-bold">Контакты</div>
                                        <div className="text-[#06B6D4] font-medium text-lg hover:underline cursor-pointer">support@depalaw.ru</div>
                                        <div className="text-slate-400">+7 909 568-44-58</div>
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

const Section = ({ id, number, title, children }) => (
    <motion.div
        id={id}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group"
    >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] text-lg font-bold border border-[#06B6D4]/20 group-hover:bg-[#06B6D4] group-hover:text-[#050B14] transition-colors">
                {number}
            </span>
            {title}
        </h2>
        <div className="space-y-4 pl-0 md:pl-14 text-slate-400">
            {children}
        </div>
    </motion.div>
);

export default OfferPage;
