import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import CreateOrderModal from '../components/CreateOrderModal';
import StatusBadge from '../components/StatusBadge';
import DashboardSkeleton from '../components/DashboardSkeleton';

const ClientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { orders, loading, createOrder } = useOrders();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleCreateOrder = async (orderData) => {
        const result = await createOrder(orderData);
        return result;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
        });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Доброе утро';
        if (hour < 18) return 'Добрый день';
        return 'Добрый вечер';
    };

    const activeOrders = orders.filter(o => o.status !== 'completed').length;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar - Floating Revolut Style */}
            <aside className="fixed left-4 top-4 bottom-4 w-64 bg-white rounded-[32px] shadow-2xl z-50 flex flex-col">
                <div className="flex flex-col items-center justify-center py-8 border-b border-gray-100">
                    {/* Logo */}
                    <img src="/logo-depa-fixed.png" alt="Depa" className="h-12 w-auto" />
                </div>

                {/* User Info Card */}
                <div className="p-4">
                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-4 mb-2">
                        <p className="text-sm font-bold text-primary truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-secondary mt-1 truncate">{user?.email}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="px-4 flex-1 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-3 text-primary bg-cyan-50 rounded-full font-semibold transition-all shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Мои заказы
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-gray-50 rounded-full transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                Документы
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-gray-50 rounded-full transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                </svg>
                                Чат
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center gap-3 px-4 py-3 text-secondary hover:text-primary hover:bg-gray-50 rounded-full transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Настройки
                            </a>
                        </li>
                    </ul>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-all mb-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Выйти
                    </button>
                </nav>
            </aside>

            {/* Main Content - Bento Grid */}
            <main className="flex-1 ml-[18rem] p-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <DashboardSkeleton />
                    ) : (
                        <>
                            {/* Bento Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Widget 1: Welcome Card (Large) */}
                                <div className="md:col-span-2 bg-white rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow">
                                    <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2">
                                        {getGreeting()}, {user?.first_name}! 👋
                                    </h1>
                                    <p className="text-secondary text-sm">
                                        У вас {activeOrders} {activeOrders === 1 ? 'активный заказ' : 'активных заказа'}. Продолжайте работать с нашими юристами.
                                    </p>
                                </div>

                                {/* Widget 2: Stats Card (Small Square) */}
                                <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer text-white">
                                    <p className="text-sm font-semibold mb-2 opacity-90">Активных заказов</p>
                                    <p className="text-5xl font-extrabold tracking-tight">{activeOrders}</p>
                                </div>
                            </div>

                            {/* Widget 3: Create Order Action Card */}
                            <div
                                onClick={() => setIsModalOpen(true)}
                                className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-[32px] p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer mb-8"
                            >
                                <div className="flex items-center justify-between text-white">
                                    <div>
                                        <h2 className="text-2xl font-extrabold tracking-tight mb-2">Создать новый заказ</h2>
                                        <p className="text-cyan-100 text-sm">Начните работу с юристом прямо сейчас</p>
                                    </div>
                                    <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Orders Section */}
                            <div className="mb-6">
                                <h2 className="text-xl font-extrabold tracking-tight text-primary mb-4">Ваши заказы</h2>
                            </div>

                            {/* Empty State */}
                            {orders.length === 0 && (
                                <div className="bg-white rounded-[32px] p-12 text-center shadow-sm">
                                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary mb-2">Пока нет заказов</h3>
                                    <p className="text-secondary text-sm mb-6">Создайте свой первый заказ одним кликом</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 font-semibold rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                        Создать первый заказ
                                    </button>
                                </div>
                            )}

                            {/* Orders Tickets - Revolut Style */}
                            {orders.length > 0 && (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer relative overflow-hidden group"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <div className="text-sm text-gray-400 mb-1 font-medium italic">
                                                        Заказ #{order.id} • {formatDate(order.created_at)}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                                                        {order.title}
                                                    </h3>
                                                    <p className="text-sm text-secondary mt-1">{order.service_type_display}</p>
                                                </div>
                                                <StatusBadge status={order.status} />
                                            </div>

                                            {/* Visual Progress Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                                                    <span>Прогресс</span>
                                                    <span>
                                                        {order.status === 'completed' ? '100%' :
                                                            order.status === 'in_progress' ? '50%' :
                                                                order.status === 'pending' ? '10%' : '30%'}
                                                    </span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${order.status === 'completed' ? 'bg-green-500 w-full' :
                                                            order.status === 'in_progress' ? 'bg-blue-500 w-1/2' :
                                                                order.status === 'pending' ? 'bg-gray-400 w-[10%]' : 'bg-yellow-400 w-[30%]'
                                                            }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <CreateOrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateOrder}
            />
        </div>
    );
};

export default ClientDashboard;
