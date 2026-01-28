import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

// Photorealistic Glass Noise Texture (SVG Data URI)
const glassNoise = "bg-[url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")]";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Услуги', href: '/services', isAnchor: false },
        { name: 'Тарифы', href: '/pricing', isAnchor: false },
        { name: 'Журнал', href: '/news', isAnchor: false },
        { name: 'О нас', href: '/about', isAnchor: false },
        { name: 'Контакты', href: '/contacts', isAnchor: false }
    ];

    const handleNavClick = (link, e) => {
        if (link.isAnchor) {
            if (!isHomePage) {
                e.preventDefault();
                navigate('/' + link.href);
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        /* 1. Outer fixed wrapper with padding for floating effect */
        <div className={`fixed top-0 left-0 right-0 z-[999] pt-4 px-4 flex justify-center transition-all duration-300 ${mobileMenuOpen ? 'h-auto' : ''}`}>

            {/* 2. The Floating Glass Card itself */}
            <nav className={`
                w-full max-w-7xl rounded-2xl flex items-center justify-between px-6
                
                /* 1. OPTICAL GLASS PHYSICS */
                backdrop-blur-xl
                backdrop-saturate-[180%] 
                backdrop-contrast-125
                
                /* 2. SURFACE COLOR (Neutral Dark) */
                bg-white/[0.03]
                
                /* 3. EDGES & DEPTH */
                border border-white/10
                shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]
                
                relative transition-all duration-300 overflow-hidden
                ${mobileMenuOpen ? 'rounded-b-2xl h-auto flex-col' : 'h-20'}
            `}>

                {/* Noise & Gradient overlays */}
                <div className={`absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none ${glassNoise}`} />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                {/* Inner Container for Bar Content */}
                <div className="w-full h-20 flex items-center justify-between z-10 relative">

                    {/* LOGO */}
                    <Link to="/" className="group flex items-center gap-2">
                        <img
                            src="/logo-depa-fixed.png"
                            alt="DEPA"
                            className="h-12 w-auto object-contain brightness-0 invert"
                            style={{ objectPosition: 'center' }}
                        />
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60 border border-white/10 backdrop-blur-md self-start mt-2">
                            BETA
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <ul className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.li key={link.name} className="relative">
                                <motion.a
                                    href={link.isAnchor ? (isHomePage ? link.href : '/' + link.href) : undefined}
                                    onClick={(e) => {
                                        if (link.isAnchor) {
                                            handleNavClick(link, e);
                                        } else {
                                            e.preventDefault();
                                            navigate(link.href);
                                        }
                                    }}
                                    className="relative px-5 py-2.5 block text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer"
                                    initial="initial"
                                    whileHover="hover"
                                >
                                    {/* The Pill */}
                                    <motion.div
                                        className="absolute inset-0 bg-white/10 rounded-xl border border-white/5"
                                        variants={{
                                            initial: { opacity: 0, scale: 0.9 },
                                            hover: {
                                                opacity: 1,
                                                scale: 1,
                                                transition: { type: "spring", stiffness: 400, damping: 20 }
                                            }
                                        }}
                                    />
                                    <span className="relative z-10">{link.name}</span>
                                </motion.a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Right side: CTA + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {/* 3. Recolored Login Button to Match AuthPage */}
                        <Link to="/auth" className="hidden md:block">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative overflow-hidden px-6 py-2.5 rounded-xl font-bold text-sm bg-[#023A55] text-white border border-white/10 shadow-[0_0_20px_-5px_rgba(2,58,85,0.6)] hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
                            >
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    <User size={18} />
                                    Личный кабинет
                                </span>
                            </motion.button>
                        </Link>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel (Inside Card for unified look) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="w-full md:hidden border-t border-white/10 overflow-hidden z-20 relative"
                        >
                            <div className="px-2 py-6 space-y-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.isAnchor ? link.href : undefined}
                                        onClick={(e) => {
                                            if (!link.isAnchor) {
                                                e.preventDefault();
                                                navigate(link.href);
                                            }
                                            handleNavClick(link, e);
                                        }}
                                        className={`block px-5 py-4 font-semibold rounded-xl border border-transparent hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer text-center ${location.pathname === link.href
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-4 mt-4 border-t border-white/10 flex justify-center">
                                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="w-full">
                                        <button className="w-full flex items-center justify-center gap-2 px-5 py-4 text-base font-bold text-white bg-[#023A55] rounded-xl shadow-lg hover:bg-[#0F2837] transition-all">
                                            <User size={20} />
                                            Личный кабинет
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
};

export default Navbar;
