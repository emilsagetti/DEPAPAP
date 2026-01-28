import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Building2, Phone, ArrowRight, Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';


// Mode Toggle Component with Sliding Pill (Dark Version)
const ModeToggle = ({ mode, setMode }) => {
    const modes = [
        { id: 'login', label: 'Вход' },
        { id: 'register', label: 'Регистрация' }
    ];

    return (
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mb-8 backdrop-blur-sm">
            {modes.map((m) => (
                <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className="flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-300 relative"
                >
                    {mode === m.id && (
                        <motion.div
                            layoutId="auth-mode-pill"
                            className="absolute inset-0 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-lg shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                            style={{ zIndex: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className={`relative z-10 transition-colors ${mode === m.id ? 'text-[#06B6D4]' : 'text-slate-400 hover:text-slate-200'
                        }`}>
                        {m.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

// Standard Input Field with Icon (Dark Version)
const InputField = ({ icon: Icon, type, placeholder, value, onChange, name, required = false }) => (
    <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors pointer-events-none">
            <Icon size={18} />
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full h-12 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.07] transition-all"
        />
    </div>
);

// Password Input with Toggle Visibility (Dark Version)
const PasswordInput = ({ placeholder, value, onChange, name, required = false }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#06B6D4] transition-colors pointer-events-none">
                <Lock size={18} />
            </div>
            <input
                type={showPassword ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full h-12 pl-11 pr-12 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06B6D4]/50 focus:bg-white/[0.07] transition-all"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

// Social Login Button (Dark Version)
const SocialButton = ({ provider, icon, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-slate-300"
    >
        <img src={icon} alt={provider} className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" />
        {provider}
    </button>
);

// Error Alert Component (Dark Version)
const ErrorAlert = ({ message, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 backdrop-blur-sm"
    >
        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-red-400 text-xs font-bold">!</span>
        </div>
        <div className="flex-1">
            <p className="text-xs text-red-200 leading-relaxed">{message}</p>
        </div>
        <button onClick={onClose} className="text-red-400 hover:text-red-200">
            <span className="text-lg leading-none">&times;</span>
        </button>
    </motion.div>
);

const AuthPage = () => {
    const [mode, setMode] = React.useState('login');
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        re_password: '',
        firstName: '',
        lastName: '',
        agreeToTerms: false
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [localError, setLocalError] = React.useState('');
    const { login, register, isAuthenticated, user, error, clearError, getRoleBasedPath } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Extract intent from navigation state (Deep Linking)
    const intentState = location.state;

    // Handle forced error from navigation (e.g. after duplicate registration)
    React.useEffect(() => {
        if (location.state?.forcedError) {
            setLocalError(location.state.forcedError);
            if (location.state.initialMode) {
                setMode(location.state.initialMode);
            }
            // Clear the state so a refresh doesn't show it again
            navigate(location.pathname, {
                replace: true,
                state: { ...location.state, forcedError: null, initialMode: null }
            });
        }
    }, [location.state, navigate, location.pathname]);

    const handleLoginSuccess = async (token) => {
        // Check if there is an intended destination
        const state = location.state;

        if (state?.intent === 'create_court_case') {
            navigate('/dashboard/court-cases/new', { state });
        } else if (state?.intent === 'upload_audit_file') {
            navigate('/dashboard/documents/audit', { state });
        } else if (state?.intent === 'register_business') {
            navigate('/dashboard/registration/new', { state });
        } else if (state?.intent === 'service_inquiry') {
            navigate('/dashboard/checkout', { state });
        } else if (state?.intent === 'subscription') {
            navigate(state.returnUrl || '/cabinet/billing', { state });
        } else if (state?.returnUrl) {
            navigate(state.returnUrl, { state });
        } else {
            navigate('/cabinet');
        }
    };

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && user) {
            handleLoginSuccess();
        }
    }, [isAuthenticated, user, navigate, location.state]);

    // Explicit handler for user-initiated mode switching
    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        clearError();
        setLocalError('');
    };

    const getRedirectPath = (role) => {
        // For staff roles, redirect to their panel
        if (role && role !== 'client') {
            return getRoleBasedPath(role);
        }

        // For clients with intent, redirect to specific page
        if (intentState?.intent) {
            switch (intentState.intent) {
                case 'subscription':
                case 'service':
                    return '/cabinet/billing';
                case 'consultation':
                    return '/cabinet/chats';
                case 'service_inquiry':
                    return '/dashboard/checkout';
                default:
                    return intentState.returnUrl || '/cabinet';
            }
        }
        return location.state?.from?.pathname || '/cabinet';
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (localError) setLocalError('');
        if (error) clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        clearError();
        setLocalError('');

        let result;

        if (mode === 'login') {
            result = await login(formData.email, formData.password);
        } else {
            // Validate Terms Agreement
            if (!formData.agreeToTerms) {
                setLocalError('Необходимо подтвердить согласие с правилами сервиса');
                setIsSubmitting(false);
                return;
            }

            // Validate password match for registration
            if (formData.password !== formData.re_password) {
                clearError();
                setLocalError('Пароли не совпадают');
                setIsSubmitting(false);
                return;
            }

            result = await register({
                email: formData.email,
                password: formData.password,
                re_password: formData.re_password,
                first_name: formData.firstName,
                last_name: formData.lastName
            });
        }

        setIsSubmitting(false);

        if (result.success && result.user) {
            const targetPath = getRedirectPath(result.user.role);
            navigate(targetPath, { state: intentState, replace: true });
        } else if (!result.success && mode === 'register') {
            // Check for specific "User exists" error types from backend
            const errorMsg = typeof result.error === 'string' ? result.error.toLowerCase() : '';
            const errorObj = typeof result.error === 'object' ? JSON.stringify(result.error).toLowerCase() : '';

            if (errorMsg.includes('exist') || errorMsg.includes('существует') ||
                errorObj.includes('exist') || errorObj.includes('существует') ||
                errorObj.includes('unique') ||
                (typeof result.error === 'object' && result.error?.email)) {

                // No need for ref or timeout anymore
                setMode('login');

                // Use navigation state to persist the error robustly
                // This forces a re-render with the new state, avoiding race conditions
                navigate(location.pathname, {
                    state: {
                        ...location.state,
                        forcedError: 'Пользователь с таким адресом электронной почты уже существует',
                        initialMode: 'login'
                    },
                    replace: true
                });
            } else {
                // Normal error display is handled by AuthContext setting 'error' state, 
                // but we can also set local error to be sure.
                setLocalError(typeof result.error === 'string' ? result.error : 'Ошибка регистрации');
            }
        } else if (!result.success && mode === 'login') {
            // Explicitly handle login failure to avoid any confusion or state leakage
            setLocalError('Некорректная эл. почта или пароль');
        }
    };

    return (
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4 relative overflow-hidden font-sans text-white">

            {/* AMBIENT GLOW ORBS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
            </div>

            {/* DOT PATTERN */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            <div className="w-full max-w-[440px] relative z-10">

                {/* Logo & Header */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <Link to="/" className="mb-6 hover:opacity-80 transition-opacity">
                        <img src="/logo-depa-fixed.png" alt="Depa" className="h-12 w-auto brightness-0 invert" />
                    </Link>
                    <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">
                        {mode === 'login' ? 'Добро пожаловать' : 'Создать аккаунт'}
                    </h1>
                    <p className="text-sm text-slate-400 text-center max-w-xs">
                        {mode === 'login'
                            ? 'Войдите для управления делами'
                            : 'Присоединяйтесь к DEPA для защиты бизнеса'
                        }
                    </p>
                </div>

                {/* Glass Card */}
                <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden">
                    {/* Glass Glare */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    {/* Mode Toggle */}
                    {/* Mode Toggle - Pass manual handler */}
                    <ModeToggle mode={mode} setMode={handleModeSwitch} />

                    {/* Error Display */}
                    <AnimatePresence>
                        {(error || localError) && (
                            <ErrorAlert
                                message={localError || error}
                                onClose={() => {
                                    if (localError) setLocalError('');
                                    if (error) clearError();
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Registration Fields */}
                        <AnimatePresence mode="sync">
                            {mode === 'register' && (
                                <motion.div
                                    key="register-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <InputField
                                            icon={User}
                                            type="text"
                                            name="firstName"
                                            placeholder="Имя"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputField
                                            icon={User}
                                            type="text"
                                            name="lastName"
                                            placeholder="Фамилия"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email */}
                        <InputField
                            icon={Mail}
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        {/* Password */}
                        <PasswordInput
                            name="password"
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        {/* Confirm Password (Register Only) */}
                        <AnimatePresence mode="sync">
                            {mode === 'register' && (
                                <motion.div
                                    key="confirm-password-field"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4">
                                        <PasswordInput
                                            name="re_password"
                                            placeholder="Подтвердите пароль"
                                            value={formData.re_password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Terms (Register Only) */}
                        <AnimatePresence mode="sync">
                            {mode === 'register' && (
                                <motion.div
                                    key="terms-checkbox"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="flex items-start gap-3 pt-2 mb-2">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="agreeToTermsAuth"
                                                name="agreeToTerms"
                                                type="checkbox"
                                                required
                                                checked={formData.agreeToTerms || false}
                                                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#06B6D4] focus:ring-offset-0 focus:ring-[#06B6D4]"
                                            />
                                        </div>
                                        <div className="text-xs text-slate-400 leading-snug">
                                            <label htmlFor="agreeToTermsAuth" className="cursor-pointer hover:text-slate-200">
                                                Я принимаю условия <Link to="/offer" target="_blank" className="text-[#06B6D4] hover:underline">оферты</Link>
                                            </label>
                                            <span> и даю согласие на обработку данных согласно </span>
                                            <Link to="/privacy" target="_blank" className="text-[#06B6D4] hover:underline">политики</Link>.
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Forgot Password Link (Login Only) */}
                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-slate-400 hover:text-[#06B6D4] transition-colors">
                                    Забыли пароль?
                                </button>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full py-3.5 rounded-xl bg-[#023A55] text-white font-bold overflow-hidden transition-all shadow-[0_0_30px_-10px_rgba(2,58,85,0.6)] border border-white/10 hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        {mode === 'login' ? 'Вход...' : 'Регистрация...'}
                                    </>
                                ) : (
                                    <>
                                        {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">или</span>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Social Login */}
                    <div className="flex gap-4">
                        <SocialButton
                            provider="Google"
                            icon="https://www.svgrepo.com/show/475656/google-color.svg"
                        />
                        <SocialButton
                            provider="Яндекс"
                            icon="https://upload.wikimedia.org/wikipedia/commons/5/58/Yandex_icon.svg"
                        />
                    </div>
                </div>

                {/* Footer Links */}
                <div className="mt-8 text-center">
                    <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
