export const SERVICE_STATUSES = {
    PENDING: { id: 'pending', label: 'На рассмотрении', color: 'orange' },
    IN_PROGRESS: { id: 'in_progress', label: 'В работе', color: 'blue' },
    DONE: { id: 'done', label: 'Готово', color: 'green' },
    CANCELED: { id: 'canceled', label: 'Отменено', color: 'red' },
    WAITING_USER: { id: 'waiting_user', label: 'Ждем ответа', color: 'purple' }
};

export const servicesData = [
    {
        id: '1023',
        title: 'Регистрация товарного знака "Вектор"',
        serviceType: 'Интеллектуальная собственность',
        status: 'in_progress',
        dateCreated: '2025-01-15',
        lastUpdate: '2025-01-23',
        responsible: 'Елена В.',
        price: 35000
    },
    {
        id: '1020',
        title: 'Аудит трудовых договоров',
        serviceType: 'Трудовое право',
        status: 'done',
        dateCreated: '2025-01-10',
        lastUpdate: '2025-01-18',
        responsible: 'Дмитрий С.',
        price: 15000
    },
    {
        id: '1024',
        title: 'Консультация по налогообложению',
        serviceType: 'Налоги',
        status: 'waiting_user',
        dateCreated: '2025-01-20',
        lastUpdate: '2025-01-21',
        responsible: 'Мария К.',
        price: 5000
    },
    {
        id: '1025',
        title: 'Сопровождение сделки M&A',
        serviceType: 'Корпоративное право',
        status: 'pending',
        dateCreated: '2025-01-22',
        lastUpdate: '2025-01-22',
        responsible: null,
        price: 120000
    }
];
