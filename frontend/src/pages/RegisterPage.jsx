import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate password match
        if (formData.password !== formData.re_password) {
            setError('Пароли не совпадают');
            setLoading(false);
            return;
        }

        setLoading(true);

        // AuthContext now handles: Register -> Login -> Update Profile
        // We pass the full formData including first_name, last_name, phone
        const result = await register(formData);

        if (result.success) {
            // Check subscription status and redirect accordingly
            const hasSubscription = result.user?.subscription_status === 'active';
            if (hasSubscription) {
                navigate('/cabinet', { replace: true });
            } else {
                navigate('/cabinet/tariff', { replace: true });
            }
        } else {
            // Handle error response from context
            const errData = result.error;

            if (typeof errData === 'string') {
                setError(errData);
            } else if (typeof errData === 'object' && errData !== null) {
                // Find first meaningful error
                const keys = Object.keys(errData);
                if (keys.length > 0) {
                    const firstKey = keys[0];
                    const val = errData[firstKey];
                    const message = Array.isArray(val) ? val[0] : val;

                    if (firstKey === 'email') {
                        setError('Этот Email уже зарегистрирован.');
                    } else if (firstKey === 'password') {
                        setError(`Пароль: ${message}`);
                    } else if (firstKey === 'non_field_errors') {
                        setError(message);
                    } else {
                        // For other fields like detail etc
                        setError(`${firstKey}: ${message}`);
                    }
                } else {
                    setError('Ошибка регистрации');
                }
            } else {
                setError('Ошибка регистрации');
            }
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-white">

            {/* AMBIENT GLOW ORBS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7C3AED] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
            </div>

            {/* DOT PATTERN */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center mb-8 w-full">
                    <Link to="/" className="mb-6 hover:opacity-80 transition-opacity">
                        {/* Assuming white logo or turning it white with brightness if needed. 
                             If it's an image, filter brightness-0 invert-1 could work if it's black, 
                             but best to trust the logo is visible or standard. 
                             Let's assume the logo needs to be white/light. */}
                        <img src="/logo-depa-fixed.png" alt="Depa" className="h-12 w-auto mx-auto brightness-0 invert" />
                    </Link>
                    <h2 className="text-3xl font-semibold text-center text-white mb-2 tracking-tight">Создать аккаунт</h2>
                    <p className="text-sm text-center text-slate-400">
                        Присоединяйтесь к DEPA для защиты бизнеса
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden">
                    {/* Glass Glare */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="first_name" className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                                    Имя
                                </label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-[#06B6D4]/50 focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="Иван"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="last_name" className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                                    Фамилия
                                </label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-[#06B6D4]/50 focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="Иванов"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-[#06B6D4]/50 focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="name@company.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                                Пароль
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-[#06B6D4]/50 focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="re_password" className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
                                Подтвердите пароль
                            </label>
                            <input
                                id="re_password"
                                name="re_password"
                                type="password"
                                required
                                value={formData.re_password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:border-[#06B6D4]/50 focus:bg-white/10 focus:outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Terms and Consent */}
                        <div className="flex items-start gap-3 pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    required
                                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#06B6D4] focus:ring-offset-0 focus:ring-[#06B6D4]"
                                />
                            </div>
                            <div className="text-xs text-slate-400 leading-snug">
                                <label htmlFor="agreeToTerms" className="cursor-pointer hover:text-slate-300">
                                    Я принимаю условия <Link to="/offer" target="_blank" className="text-[#06B6D4] hover:text-[#22d3ee] underline decoration-solid decoration-[0.5px]">оферты</Link>
                                </label>
                                <span> и даю согласие на обработку данных согласно </span>
                                <Link to="/privacy" target="_blank" className="text-[#06B6D4] hover:text-[#22d3ee] underline decoration-solid decoration-[0.5px]">политики</Link>.
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full py-4 rounded-xl bg-[#023A55] text-white font-bold overflow-hidden transition-all shadow-[0_0_30px_-10px_rgba(2,58,85,0.6)] border border-white/10 hover:scale-[1.01] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#0891B2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                            </span>
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            Уже есть аккаунт?{' '}
                            <Link to="/login" className="text-white hover:text-[#06B6D4] font-medium transition-colors">
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-8 text-center">
                    <Link to="/" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
