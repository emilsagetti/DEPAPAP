export const billingData = {
    balance: 15400,
    invoices: [
        { id: 'INV-001', date: '2025-01-01', amount: 50000, status: 'paid', description: 'Абонентское обслуживание (Январь)' },
        { id: 'INV-002', date: '2025-01-15', amount: 35000, status: 'pending', description: 'Регистрация ТЗ' }
    ],
    transactions: [
        { id: 'TR-101', date: '2025-01-01', amount: -50000, type: 'write_off', description: 'Оплата счета INV-001' },
        { id: 'TR-100', date: '2024-12-28', amount: 60000, type: 'deposit', description: 'Пополнение баланса' }
    ]
};
