import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();

    return (
        <header className="
            sticky top-0 z-50 
            /* 1. OPTICAL GLASS PHYSICS */
            backdrop-blur-[40px] 
            backdrop-saturate-[180%] 
            backdrop-contrast-125
            
            /* 2. SURFACE COLOR */
            bg-[#0F2837]/60
            
            /* 3. EDGES & DEPTH */
            border-b border-white/10
            shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2),_0px_10px_20px_-10px_rgba(0,0,0,0.5)]
        ">
            {/* Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    {/* Depa Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/logo-depa-fixed.png" alt="Depa" className="h-10 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        <a href="#services" className="text-secondary hover:text-accent transition-colors font-medium">Услуги</a>
                        <a href="#how-it-works" className="text-secondary hover:text-accent transition-colors font-medium">Как работаем</a>
                        <a href="#pricing" className="text-secondary hover:text-accent transition-colors font-medium">Тарифы</a>
                    </nav>

                    {/* Login/Dashboard Button */}
                    {isAuthenticated ? (
                        <Link
                            to="/client/dashboard"
                            className="hidden md:inline-block px-6 py-2.5 text-sm font-medium bg-accent text-white hover:bg-accent-dark transition-all rounded-sm"
                        >
                            Личный кабинет
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden md:inline-block px-6 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-all rounded-sm"
                        >
                            Войти
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden">
                        <nav className="py-4 space-y-4">
                            <a href="#services" className="block text-secondary hover:text-accent transition-colors font-medium py-2">Услуги</a>
                            <a href="#how-it-works" className="block text-secondary hover:text-accent transition-colors font-medium py-2">Как работаем</a>
                            <a href="#pricing" className="block text-secondary hover:text-accent transition-colors font-medium py-2">Тарифы</a>
                            {isAuthenticated ? (
                                <Link
                                    to="/client/dashboard"
                                    className="block px-6 py-2.5 text-sm font-medium bg-accent text-white hover:bg-accent-dark transition-all rounded-sm text-center mt-4"
                                >
                                    Личный кабинет
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block px-6 py-2.5 text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-white transition-all rounded-sm text-center mt-4"
                                >
                                    Войти
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
