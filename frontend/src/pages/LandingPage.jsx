import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import PricingBuilder from '../components/PricingBuilder';
import SecuritySection from '../components/SecuritySection';
import Footer from '../components/Footer';
import HeroScene3D from '../components/HeroScene3D';
import NewsSection from '../components/NewsSection';
import TrustSection from '../components/TrustSection';
import SupportWidget from '../components/SupportWidget';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const LandingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pricingMode, setPricingMode] = useState('subscription');

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle Deep Linking / State Navigation
    useEffect(() => {
        if (location.state?.scrollTo) {
            scrollToSection(location.state.scrollTo);
        }
        if (location.state?.pricingMode) {
            setPricingMode(location.state.pricingMode);
        }
    }, [location]);

    // Navigate to auth with intent state (Deep Linking)
    const handleConsultation = () => {
        navigate('/auth', {
            state: {
                intent: 'consultation',
                returnUrl: '/dashboard/chat'
            }
        });
    };

    // Handle plan selection - redirect to auth with subscription intent
    const handleSelectPlan = (planName, price) => {
        navigate('/auth', {
            state: {
                intent: 'subscription',
                planId: planName.toLowerCase().replace(/\s+/g, '_'),
                planName: planName,
                planPrice: price,
                returnUrl: '/dashboard/billing'
            }
        });
    };

    // Handle one-time service selection
    const handleSelectService = (serviceName, price) => {
        navigate('/auth', {
            state: {
                intent: 'service',
                serviceId: serviceName.toLowerCase().replace(/\s+/g, '_'),
                serviceName: serviceName,
                servicePrice: price,
                returnUrl: '/dashboard/billing'
            }
        });
    };

    return (
        <div className="relative min-h-screen bg-[#050B14] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* AMBIENT GLOW ORBS (Matched to AuthPage) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
            </div>

            {/* DOT PATTERN OVERLAY */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            {/* NOISE TEXTURE */}
            <div className={`fixed inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none ${glassNoise}`} />

            <Navbar />

            {/* CONTENT */}
            <div className="relative z-10">
                <main>
                    {/* Two-Column Hero Section */}
                    <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-20 px-6 max-w-7xl mx-auto" id="hero">
                        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

                            {/* Left Column: Text & CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="w-full lg:w-1/2 text-center lg:text-left z-10"
                            >
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-100/80 mb-8 w-fit mx-auto lg:mx-0 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse shadow-[0_0_10px_#06B6D4]"></span>
                                    Trusted LegalPartner 2026
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
                                    Ваш бизнес под <br />
                                    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                        надежной защитой
                                        {/* Underline Glow */}
                                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#06B6D4] to-transparent opacity-50 blur-sm rounded-full"></div>
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                                    Современный консалтинг, аутсорсинг и готовые решения для малого и среднего бизнеса в одном окне.
                                    Прозрачные тарифы и гарантия качества.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleConsultation}
                                        className="group relative px-8 py-4 rounded-xl bg-[#023A55] text-white font-bold overflow-hidden transition-all shadow-[0_0_30px_-10px_rgba(2,58,85,0.6)] border border-white/10 hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)]"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <span className="relative flex items-center gap-2">
                                            Начать бесплатно
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => scrollToSection('pricing')}
                                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-semibold backdrop-blur-md transition-all shadow-lg hover:shadow-xl"
                                    >
                                        Узнать тарифы
                                    </motion.button>
                                </div>

                                <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/20 group-hover:border-[#06B6D4]/40 transition-colors">
                                            <CheckCircle2 size={16} className="text-[#06B6D4]" />
                                        </div>
                                        <span>Работаем 24/7</span>
                                    </div>
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <div className="w-8 h-8 rounded-full bg-[#06B6D4]/10 flex items-center justify-center border border-[#06B6D4]/20 group-hover:border-[#06B6D4]/40 transition-colors">
                                            <Shield size={16} className="text-[#06B6D4]" />
                                        </div>
                                        <span>Страхование 10 млн ₽</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column: 3D Sapphire Structure */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2 }}
                                className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative"
                            >
                                {/* 3D Element Glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#06B6D4]/10 rounded-full blur-[100px] -z-10"></div>

                                <HeroScene3D />
                            </motion.div>
                        </div>
                    </section>



                    {/* Pricing Builder Section */}
                    <section id="pricing">
                        <PricingBuilder onSelectPlan={handleSelectPlan} initialMode={pricingMode} />
                    </section>

                    {/* Security & Trust Section */}
                    <section id="about">
                        <SecuritySection />
                    </section>

                    {/* News Section */}
                    <section id="news">
                        <NewsSection />
                    </section>

                    {/* Trust Section */}
                    <section id="contact">
                        <TrustSection />
                    </section>

                    {/* Footer */}
                    <Footer />
                </main>
            </div>

            {/* Floating Support Widget */}
            <SupportWidget />
        </div>
    );
};

export default LandingPage;
