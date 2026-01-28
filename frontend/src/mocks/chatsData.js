export const chatsData = [
    {
        id: 1,
        subject: "Налоговый вопрос",
        status: "active",
        lastMessage: "Мы подготовили ответ по вашему запросу.",
        lastMessageDate: "2025-01-20T14:20:00",
        unreadCount: 2,
        messages: [
            { id: 1, sender: "user", text: "Здравствуйте, нужен совет по НДС.", date: "2025-01-19T10:00:00" },
            { id: 2, sender: "lawyer", text: "Добрый день! Уточните, пожалуйста, детали вашего кейса.", date: "2025-01-19T10:15:00" },
            { id: 3, sender: "user", text: "Мы планируем экспорт в Китай...", date: "2025-01-19T10:30:00" },
            { id: 4, sender: "lawyer", text: "Мы подготовили ответ по вашему запросу. Прилагаю файл.", date: "2025-01-20T14:20:00", active: true }
        ]
    },
    {
        id: 2,
        subject: "Регистрация товарного знака",
        status: "closed",
        lastMessage: "Спасибо, документы получили.",
        lastMessageDate: "2025-01-15T12:00:00",
        unreadCount: 0,
        messages: []
    }
];
