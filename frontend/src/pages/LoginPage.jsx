import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/client/dashboard');
        } else {
            setError(result.error?.detail || 'Неверный email или пароль');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center mb-8 w-full">
                    <Link to="/" className="mb-4">
                        <img src="/logo-depa-fixed.png" alt="Depa" className="h-14 w-auto mx-auto" />
                    </Link>
                    <h2 className="text-3xl font-bold text-center text-primary mb-2">Вход</h2>
                    <p className="text-sm text-center text-secondary">
                        Войдите в свой аккаунт
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-sm text-sm">
                                {error}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-sm focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-sm focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-white px-6 py-4 font-semibold rounded-sm hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-secondary">
                            Нет аккаунта?{' '}
                            <Link to="/register" className="text-accent font-semibold hover:text-accent-dark transition-colors">
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link to="/" className="text-sm text-secondary hover:text-accent transition-colors">
                        ← Вернуться на главную
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
