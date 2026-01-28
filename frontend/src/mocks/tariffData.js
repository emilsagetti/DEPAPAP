export const tariffData = {
    currentPlan: {
        id: 'business',
        name: 'Business',
        price: 50000,
        renewDate: '2025-02-01',
        limits: {
            requests: { total: 10, used: 3 },
            consultations: { total: 5, used: 2 },
            storage: { total: '10 GB', used: '2.4 GB' }
        }
    },
    plans: [
        { id: 'start', name: 'Start', price: 15000, features: ['3 запроса в месяц', 'Базовая поддержка'] },
        { id: 'business', name: 'Business', price: 50000, features: ['10 запросов в месяц', 'Приоритетная поддержка', 'Личный менеджер'] },
        { id: 'premium', name: 'Premium', price: 100000, features: ['Безлимитные запросы', '24/7 поддержка', 'Выезд юриста'] }
    ]
};
