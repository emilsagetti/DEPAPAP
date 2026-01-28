import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CabinetService {
    getDashboardStats() {
        return {
            activeRequests: 4,
            documentsCount: 12,
            consultationsAvailable: 1,
            balance: 5000,
            nextPaymentDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            recentActivity: [
                { type: 'status_change', text: 'Заявка "Регистрация ООО" принята в работу', date: new Date().toISOString() },
                { type: 'payment', text: 'Оплата тарифа "Бизнес"', date: new Date(Date.now() - 86400000).toISOString() },
            ]
        };
    }

    getRequests(limit: number = 5, status: string = 'all') {
        // Return dummy requests
        return {
            results: [
                {
                    id: 'req-1',
                    title: 'Регистрация ООО "Вектор"',
                    status: 'in_progress',
                    status_display: 'В работе',
                    price: 15000,
                    service_type: 'Регистрация бизнеса',
                    updated_at: new Date().toISOString()
                },
                {
                    id: 'req-2',
                    title: 'Проверка договора аренды',
                    status: 'pending',
                    status_display: 'На проверке',
                    price: 5000,
                    service_type: 'Юридическая экспертиза',
                    updated_at: new Date(Date.now() - 86400000).toISOString()
                },
                {
                    id: 'req-3',
                    title: 'Консультация по налогообложению',
                    status: 'completed',
                    status_display: 'Завершено',
                    price: 3000,
                    service_type: 'Консультация',
                    updated_at: new Date(Date.now() - 172800000).toISOString()
                }
            ].slice(0, limit)
        };
    }
}
